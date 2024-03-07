from flask_admin import Admin
from flask_admin.contrib.peewee import ModelView

from .models import Category, Service, Subject, Contractor


class SubjectView(ModelView):
    can_create = False
    can_delete = False


def create_admin(app):
    admin = Admin(app, name='Telecom Marketplace')
    admin.add_view(ModelView(Category))
    admin.add_view(ModelView(Service))
    admin.add_view(SubjectView(Subject))
    admin.add_view(ModelView(Contractor))
