import csv
import os

from datetime import datetime
from decimal import Decimal

from flask_jwt_extended import JWTManager
from peewee import fn, BooleanField, CharField, DateTimeField, DecimalField, DeferredForeignKey, ForeignKeyField, IntegerField, SmallIntegerField
from playhouse.flask_utils import FlaskDB
from playhouse.postgres_ext import TSVectorField

from fields import bcrypt, PasswordField  # noqa F401


jwt = JWTManager()
db_wrapper = FlaskDB()

KIND_PROVIDER = 1
KIND_CONSUMER = 2

KIND_CHOICES = [
    (KIND_PROVIDER, 'поставщик'),
    (KIND_CONSUMER, 'заказчик')
]

STATUS_NEW = 0
STATUS_MODIFIED = 1
STATUS_PROCESSING = 2
STATUS_APPROVED = 16
STATUS_REJECTED = 64

STATUS_CHOICES = [
    (STATUS_NEW, 'новая'),
    (STATUS_MODIFIED, 'обновлённая'),
    (STATUS_PROCESSING, 'на рассмотрении'),
    (STATUS_APPROVED, 'подтверждённая'),
    (STATUS_REJECTED, 'отклонённая')
]


class Brand(db_wrapper.Model):
    name = CharField(verbose_name='название')

    def __str__(self):
        return self.name

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name
        }
        return data


class ServiceCategory(db_wrapper.Model):
    name = CharField(verbose_name='название')
    seq = SmallIntegerField(verbose_name='порядок')
    parent = ForeignKeyField('self', backref='children', null=True, verbose_name='родитель')

    def __str__(self):
        return self.name

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'parent': self.parent_id
        }
        return data


class Service(db_wrapper.Model):
    category = ForeignKeyField(ServiceCategory, verbose_name='категория')
    short_name = CharField(verbose_name='краткое название')
    name = CharField(verbose_name='название')
    description = CharField(max_length=None, null=True, verbose_name='описание')
    fts_vector = TSVectorField()

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'category': self.category.id,
            'short_name': self.short_name,
            'name': self.name,
            'description': self.description
        }
        return data

    def update_fts_vector(self):
        language = 'russian'
        vector = (
            fn.setweight(
                fn.to_tsvector(language, fn.coalesce(Service.name, '')),
                'A'
            )
            .concat(fn.setweight(
                fn.to_tsvector(language, fn.coalesce(Service.description, '')),
                'B'
            ))
            .concat(fn.setweight(
                fn.to_tsvector(language, fn.coalesce(ServiceCategory.name, '')),
                'C'
            ))
        )

        query = (
            Service
            .update(fts_vector=vector)
            .from_(ServiceCategory)
            .where(
                Service.id == self.id,
                ServiceCategory.id == Service.category
            )
        )
        query.execute()


class ServiceFile(db_wrapper.Model):
    service = ForeignKeyField(Service)
    name = CharField(max_length=None, verbose_name='имя')
    file = CharField(max_length=None, verbose_name='файл')
    size = IntegerField(verbose_name='размер')
    seq = SmallIntegerField(verbose_name='порядок')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'file': self.file,
            'size': self.size,
            'src': os.path.join('services', str(self.service.id), self.file)
        }
        return data


class Subject(db_wrapper.Model):
    code = SmallIntegerField(primary_key=True, verbose_name='код региона')
    name = CharField(verbose_name='название')

    @property
    def serialize(self):
        data = {
            'code': self.code,
            'name': self.name
        }
        return data


class ProductCategory(db_wrapper.Model):
    name = CharField(verbose_name='название')
    seq = SmallIntegerField(verbose_name='порядок')
    parent = ForeignKeyField('self', backref='children', null=True, verbose_name='родитель')

    def __str__(self):
        return self.name

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'parent': self.parent_id
        }
        return data


class Product(db_wrapper.Model):
    code = CharField(max_length=30, unique=True, verbose_name='код')
    name = CharField(max_length=None, verbose_name='название')
    brand = ForeignKeyField(Brand, verbose_name='бренд')
    category = ForeignKeyField(ProductCategory, verbose_name='категория')
    description = CharField(max_length=None, null=True, verbose_name='описание')
    price = IntegerField(verbose_name='цена')
    add_watermark = BooleanField(default=False, verbose_name='добавлять водяной знак')
    fts_vector = TSVectorField()

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'code': self.code,
            'name': self.name,
            'brand': self.brand_id,
            'category': self.category_id,
            'description': self.description,
            'price': self.price,
            'add_watermark': self.add_watermark,
            'images': [image.serialize for image in self.images]
        }
        return data

    def update_fts_vector(self):
        language = 'russian'
        vector = (
            fn.setweight(
                fn.to_tsvector(language, fn.coalesce(Product.code, ''))
                .concat(fn.to_tsvector(language, fn.coalesce(Product.name, '')))
                .concat(fn.to_tsvector(language, fn.coalesce(Brand.name, ''))),
                'A'
            )
            .concat(fn.setweight(
                fn.to_tsvector(language, fn.coalesce(Product.description, '')),
                'B'
            ))
            .concat(fn.setweight(
                fn.to_tsvector(language, fn.coalesce(ProductCategory.name, '')),
                'C'
            ))
        )

        query = (
            Product
            .update(fts_vector=vector)
            .from_(Brand, ProductCategory)
            .where(
                Product.id == self.id,
                Brand.id == Product.brand,
                ProductCategory.id == Product.category
            )
        )
        query.execute()


class ProductImage(db_wrapper.Model):
    product = ForeignKeyField(Product, backref='images')
    file = CharField(max_length=None, verbose_name='файл')
    width = SmallIntegerField(verbose_name='ширина')
    height = SmallIntegerField(verbose_name='высота')
    seq = SmallIntegerField(verbose_name='порядок')

    @property
    def serialize(self):
        image_path = os.path.join('products', str(self.product.id), self.file)
        data = {
            'id': self.id,
            'file': self.file,
            'width': self.width,
            'height': self.height,
            'src': '/' + image_path
            # 'thumbnail': {
            #     'src': thumbnail.get_thumbnail(image_path, '260x280', crop="pad", background=0xffffff),
            #     'width': 260,
            #     'height': 280
            # }
        }
        return data


class PriceFactor(db_wrapper.Model):
    name = CharField(verbose_name='название')
    factor = DecimalField(max_digits=4, decimal_places=2, verbose_name='коэффициент')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'factor': self.factor
        }
        return data


class Contractor(db_wrapper.Model):
    status = SmallIntegerField(choices=STATUS_CHOICES, default=STATUS_NEW, index=True, verbose_name='статус')
    kind = SmallIntegerField(choices=KIND_CHOICES, index=True, verbose_name='тип контрагента')
    price_factor = ForeignKeyField(PriceFactor, null=True, verbose_name='категория цен')
    end_consumer = BooleanField(default=False, verbose_name='конечный потребитель')
    name = CharField(max_length=None, verbose_name='название')
    inn = CharField(max_length=12, unique=True, verbose_name='ИНН')
    legal_address = CharField(max_length=None, verbose_name='юридический адрес')
    contact_phone = CharField(max_length=None, verbose_name='контактный телефон')
    cover_letter = CharField(max_length=None, null=True, verbose_name='информация о компании')
    experience = CharField(max_length=None, null=True, verbose_name='опыт работы')
    company_info = DeferredForeignKey('UserFile', null=True, verbose_name='файл с информацией о компании')
    pricelist = DeferredForeignKey('UserFile', null=True, verbose_name='прайслист')
    comment = CharField(max_length=None, null=True, verbose_name='комментарий')

    def serialize(self, admin=False):
        if admin:
            price_factor = self.price_factor_id
        elif self.price_factor is not None:
            price_factor = self.price_factor.factor
        else:
            price_factor = Decimal('1')

        data = {
            'id': self.id,
            'kind': self.kind,
            'status': self.status,
            'price_factor': price_factor,
            'end_consumer': self.end_consumer,
            'name': self.name,
            'inn': self.inn,
            'legal_address': self.legal_address,
            'contact_phone': self.contact_phone,
            'cover_letter': self.cover_letter,
            'experience': self.experience,
            'company_info': self.company_info.serialize if self.company_info else None,
            'pricelist': self.pricelist.serialize if self.pricelist else None,
            'services': [{'id': s.service.id, 'approved': s.approved} for s in self.services],
            'geography': [{'code': g.subject.code, 'approved': g.approved} for g in self.geography],
        }
        if admin:
            data['users'] = [u.user.id for u in self.users],
            data['comment'] = self.comment
        return data

    def reload(self):
        newer_self = self.get(self._meta.primary_key == self.get_id())
        for field_name in self._meta.fields.keys():
            val = getattr(newer_self, field_name)
            setattr(self, field_name, val)
        self._dirty.clear()


class Geography(db_wrapper.Model):
    contractor = ForeignKeyField(Contractor, backref='geography')
    subject = ForeignKeyField(Subject, backref='contractors')
    approved = BooleanField(default=False, verbose_name='одобрен')


class Catalogue(db_wrapper.Model):
    contractor = ForeignKeyField(Contractor, backref='services')
    service = ForeignKeyField(Service, backref='contractors')
    approved = BooleanField(default=False, verbose_name='одобрен')


class User(db_wrapper.Model):
    name = CharField(max_length=None, verbose_name='ФИО')
    phone = CharField(max_length=None, null=True, verbose_name='телефон')
    email = CharField(unique=True, verbose_name='e-mail')
    password = PasswordField(verbose_name='пароль')
    position = CharField(max_length=None, null=True, verbose_name='должность')
    provider = BooleanField(default=False, verbose_name='представитель поставщика')
    consumer = BooleanField(default=False, verbose_name='представитель заказчика')
    admin = BooleanField(default=False, verbose_name='администратор')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'position': self.position,
            'provider': self.provider,
            'consumer': self.consumer,
            'admin': self.admin
        }
        return data

    def get_price_factor(self):
        contractors = (
            Contractor
            .select()
            .join(ContractorUser)
            .where(ContractorUser.user == self)
            .distinct()
        )
        price_factor = Decimal('1')
        for contractor in contractors:
            if contractor.price_factor is not None and contractor.price_factor.factor < price_factor:
                price_factor = contractor.price_factor.factor
        return price_factor


class UserFile(db_wrapper.Model):
    user = ForeignKeyField(User)
    name = CharField(max_length=None, verbose_name='имя')
    file = CharField(max_length=None, verbose_name='файл')
    size = IntegerField(verbose_name='размер')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name,
            'file': self.file,
            'size': self.size
        }
        return data


class ContractorUser(db_wrapper.Model):
    contractor = ForeignKeyField(Contractor, backref='users')
    user = ForeignKeyField(User, backref='contractors')


class Cart(db_wrapper.Model):
    user = ForeignKeyField(User, backref='cart')
    product = ForeignKeyField(Product)
    quantity = SmallIntegerField(verbose_name='количество')
    created = DateTimeField(default=datetime.now, verbose_name='дата добавления')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'product': self.product.serialize,
            'quantity': self.quantity
        }
        return data


ORDER_STATUS_NEW = 0
ORDER_STATUS_PROCESSING = 1
ORDER_STATUS_CANCELED = 8192
ORDER_STATUS_DONE = 16384

ORDER_STATUS_CHOICES = [
    (ORDER_STATUS_NEW, 'новый'),
    (ORDER_STATUS_PROCESSING, 'в обработке'),
    (ORDER_STATUS_CANCELED, 'отменён'),
    (ORDER_STATUS_DONE, 'выполнен')
]


class Order(db_wrapper.Model):
    user = ForeignKeyField(User, backref='cart')
    status = SmallIntegerField(choices=ORDER_STATUS_CHOICES, default=ORDER_STATUS_NEW, index=True, verbose_name='статус')
    created = DateTimeField(default=datetime.now, verbose_name='дата создания')
    comment = CharField(max_length=None, null=True, verbose_name='комментарий')

    @property
    def total(self):
        total = 0
        for item in self.items:
            total = total + item.cost * item.quantity
        return total

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'status': self.status,
            'created': self.created,
            'total': self.total,
            'comment': self.comment,
            'items': [item.serialize for item in self.items]
        }
        return data


class OrderItem(db_wrapper.Model):
    order = ForeignKeyField(Order, backref='items')
    product = ForeignKeyField(Product)
    quantity = SmallIntegerField(verbose_name='количество')
    price = IntegerField(verbose_name='цена')
    cost = IntegerField(verbose_name='стоимость')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'product': self.product.serialize,
            'quantity': self.quantity,
            'price': self.price,
            'cost': self.cost
        }
        return data


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.select().filter(User.id == identity).first()


def setup_db(app):
    db_wrapper.database.create_tables([
        Brand,
        ServiceCategory,
        Service,
        ServiceFile,
        Subject,
        ProductCategory,
        Product,
        ProductImage,
        Contractor,
        Geography,
        Catalogue,
        User,
        UserFile,
        ContractorUser,
        PriceFactor,
        Cart,
        Order,
        OrderItem
    ], safe=True)
    if not User.select().count():
        admin = User(name='Администратор', email='admin', password='admin', admin=True)
        admin.save()
        app.logger.warn('Default admin user created, you should change their password!')
    if not Subject.select().count():
        with open('data/subjects.csv') as csvfile:
            data = list(csv.DictReader(csvfile))
            if data:
                Subject.insert_many(data).execute()
