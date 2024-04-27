import csv

from flask_jwt_extended import JWTManager
from peewee import BooleanField, CharField, ForeignKeyField, SmallIntegerField
from playhouse.flask_utils import FlaskDB

from .fields import bcrypt, PasswordField  # noqa F401


jwt = JWTManager()
db_wrapper = FlaskDB()

KIND_PROVIDER = 1
KIND_CONSUMER = 2

KIND_CHOICES = [
    (KIND_PROVIDER, 'поставщик'),
    (KIND_CONSUMER, 'заказчик')
]


class Category(db_wrapper.Model):
    name = CharField(verbose_name='название')
    seq = SmallIntegerField(verbose_name='порядок')

    class Meta:
        order_by = ['seq']

    def __str__(self):
        return self.name

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'name': self.name
        }
        return data


class Service(db_wrapper.Model):
    category = ForeignKeyField(Category, verbose_name='категория')
    name = CharField(verbose_name='название')
    description = CharField(null=True, verbose_name='описание')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'category': self.category.id,
            'name': self.name,
            'description': self.description
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


class Contractor(db_wrapper.Model):
    kind = SmallIntegerField(choices=KIND_CHOICES, index=True, verbose_name='тип контрагента')
    name = CharField(verbose_name='название')
    inn = CharField(max_length=12, unique=True, verbose_name='ИНН')
    legal_address = CharField()
    cover_letter = CharField(null=True, verbose_name='информация о компании')
    cover_file = CharField(null=True, verbose_name='файл с информацией о компании')
    experience = CharField(null=True, verbose_name='опыт работы')
    experience_file = CharField(null=True, verbose_name='файл с опытом работы')

    @property
    def serialize(self):
        data = {
            'id': self.id,
            'kind': self.kind,
            'name': self.name,
            'inn': self.inn,
            'legal_address': self.legal_address,
            'cover_letter': self.cover_letter,
            'cover_file': self.cover_file,
            'experience': self.experience,
            'experience_file': self.experience_file,
            'geography': [g.subject.code for g in self.geography]
        }
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


class Catalog(db_wrapper.Model):
    contractor = ForeignKeyField(Contractor, backref='services')
    service = ForeignKeyField(Service, backref='contractors')
    approved = BooleanField(default=False, verbose_name='одобрен')


class User(db_wrapper.Model):
    email = CharField(unique=True, verbose_name='e-mail')
    password = PasswordField(verbose_name='пароль')
    admin = BooleanField(default=False, verbose_name='администратор')


class ContractorUser(db_wrapper.Model):
    contractor = ForeignKeyField(Contractor, backref='users')
    user = ForeignKeyField(User, backref='contractors')


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.select().filter(User.id == identity).first()


def setup_db(app):
    db_wrapper.database.create_tables([
        Category,
        Service,
        Subject,
        Contractor,
        Geography,
        Catalog,
        User,
        ContractorUser
    ], safe=True)
    if not User.select().count():
        admin = User(email='admin', password='admin', admin=True)
        admin.save()
        app.logger.warn('Default admin user created, you should change their password!')
    if not Subject.select().count():
        with open('data/subjects.csv') as csvfile:
            data = list(csv.DictReader(csvfile))
            if data:
                Subject.insert_many(data).execute()
