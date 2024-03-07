from peewee import BooleanField, CharField, ForeignKeyField, SmallIntegerField
from playhouse.flask_utils import FlaskDB


db_wrapper = FlaskDB()

KIND_PROVIDER = 1
KIND_CONSUMER = 2

KIND_CHOICES = [
    (KIND_PROVIDER, "поставщик"),
    (KIND_CONSUMER, "заказчик")
]


class Category(db_wrapper.Model):
    name = CharField(verbose_name='название')


class Service(db_wrapper.Model):
    category = ForeignKeyField(Category, verbose_name='категория')
    name = CharField(verbose_name='название')
    description = CharField(verbose_name='описание')


class Subject(db_wrapper.Model):
    code = SmallIntegerField(primary_key=True, verbose_name='код региона')
    name = CharField(verbose_name='название')


class Contractor(db_wrapper.Model):
    kind = SmallIntegerField(choices=KIND_CHOICES, index=True, verbose_name='тип контрагента')
    name = CharField(verbose_name='название')
    inn = CharField(max_length=12, verbose_name='ИНН', unique=True)
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


def setup_db():
    db_wrapper.database.create_tables([Category, Service, Subject, Contractor, Geography, Catalog], safe=True)
