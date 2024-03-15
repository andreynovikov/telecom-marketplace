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


class Service(db_wrapper.Model):
    category = ForeignKeyField(Category, verbose_name='категория')
    name = CharField(verbose_name='название')
    description = CharField(null=True, verbose_name='описание')


class Subject(db_wrapper.Model):
    code = SmallIntegerField(primary_key=True, verbose_name='код региона')
    name = CharField(verbose_name='название')


class Contractor(db_wrapper.Model):
    kind = SmallIntegerField(choices=KIND_CHOICES, index=True, verbose_name='тип контрагента')
    name = CharField(verbose_name='название')
    inn = CharField(max_length=12, unique=True, verbose_name='ИНН')
    legal_address = CharField()
    cover_letter = CharField(null=True, verbose_name='информация о компании')
    cover_file = CharField(null=True, verbose_name='файл с информацией о компании')
    experience = CharField(null=True, verbose_name='опыт работы')
    experience_file = CharField(null=True, verbose_name='файл с опытом работы')


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


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.select().filter(User.id == identity).first()


def setup_db(app):
    db_wrapper.database.create_tables([Category, Service, Subject, Contractor, Geography, Catalog, User], safe=True)
    if not User.select().count():
        admin = User(email='admin', password='admin', admin=True)
        admin.save()
        app.logger.warn('Default admin user created, you should change their password!')
    if not Subject.select().count():
        with open('data/subjects.csv') as csvfile:
            data = list(csv.DictReader(csvfile))
            if data:
                Subject.insert_many(data).execute()
