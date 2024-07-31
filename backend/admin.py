from flask_admin import Admin, BaseView, expose
from flask_admin.contrib.peewee import ModelView
from flask_jwt_extended import current_user, verify_jwt_in_request

from .models import ServiceCategory, Service, Subject, Contractor


class LoginView(BaseView):
    @expose('/')
    def login(self):
        return self.render('admin/login.html')


class AdminModelView(ModelView):
    page_size = 50

    def is_accessible(self):
        res = verify_jwt_in_request(optional=True)
        if res is None:
            return False
        return current_user.admin


class SubjectView(AdminModelView):
    can_create = False
    can_delete = False


def create_admin(app):
    admin = Admin(app, name='SI Telecom', template_mode='bootstrap4')
    admin.add_view(AdminModelView(ServiceCategory))
    admin.add_view(AdminModelView(Service))
    admin.add_view(SubjectView(Subject))
    admin.add_view(AdminModelView(Contractor))
    admin.add_view(LoginView(name='Login', endpoint='login'))
