import os

from peewee import CharField, ForeignKeyField, SmallIntegerField
from playhouse.postgres_ext import PostgresqlDatabase
from playhouse.signals import Model


db = PostgresqlDatabase(None, autoconnect=False)


class BaseModel(Model):
    class Meta:
        database = db


KIND_PROVIDER = 1
KIND_CONSUMER = 2

KIND_CHOICES = [
    (KIND_PROVIDER, "поставщик"),
    (KIND_CONSUMER, "заказчик")
]


class Category(BaseModel):
    name = CharField(verbose_name='название')


class Service(BaseModel):
    category = ForeignKeyField(Category, verbose_name='категория')
    name = CharField(verbose_name='название')
    description = CharField(verbose_name='описание')


class Subject(BaseModel):
    code = SmallIntegerField(primary_key=True, verbose_name='код региона')
    name = CharField(verbose_name='название')


class Contractor(BaseModel):
    kind = SmallIntegerField(choices=KIND_CHOICES, index=True, verbode_name='тип контрагента')
    name = CharField(verbose_name='название')
    inn = CharField(max_length=12, verbose_name='ИНН', unique=True)
    legal_address = CharField()
    cover_letter = CharField(null=True, verbose_name='информация о компании')
    cover_file = CharField(null=True, verbose_name='файл с информацией о компании')
    experience = CharField(null=True, verbose_name='опыт работы')
    experience_file = CharField(null=True, verbose_name='файл с опытом работы')


class Geography(BaseModel):
    contractor = ForeignKeyField(Contractor, backref='geography')
    subject = ForeignKeyField(Subject, backref='contractors')


class Catalog(BaseModel):
    contractor = ForeignKeyField(Contractor, backref='services')
    service = ForeignKeyField(Service, backref='contractors')


@db.connection_context()
def setup_db():
    db.create_tables([Category, Service, Subject, Contractor, Geography, Catalog], safe=True)


def init_db():
    db.init(
        os.environ.get('DB_NAME'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        host=os.environ.get('DB_HOST'),
        port=os.environ.get('DB_PORT')
    )
