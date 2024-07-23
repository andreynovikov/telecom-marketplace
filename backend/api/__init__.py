import re
import os

from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import current_user, jwt_required
from peewee import fn, PeeweeException, DoesNotExist

from ..models import db_wrapper, Category, Service, Subject, User, Contractor, Catalogue, Geography, ContractorUser
from ..models import STATUS_MODIFIED

from .brand import bp as brand_bp
from .product import bp as product_bp
from .user import bp as user_bp

secure_file_name = re.compile(r"[/\\?%*:|\"<>\x7F\x00-\x1F]")

bp = Blueprint('api', __name__)
bp.register_blueprint(brand_bp)
bp.register_blueprint(product_bp)
bp.register_blueprint(user_bp)


@bp.errorhandler(PeeweeException)
def handle_data_error(e):
    current_app.logger.error(str(e))
    return jsonify(msg=str(e)), 400


@bp.errorhandler(DoesNotExist)
def does_not_exist(e):
    return jsonify(msg=str(e)), 404


@bp.errorhandler(404)
def resource_not_found(e):
    return jsonify(msg=str(e)), 404


@bp.route('/categories', methods=['GET'])
def list_categories():
    query = (
        Category.select()
    )
    return [c.serialize for c in query]


@bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    seq = Category.select(fn.Max(Category.seq)).scalar() + 1
    category = Category.create(**data, seq=seq)
    return category.serialize


@bp.route('/categories/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Category.update(**data).where(Category.id == id).execute()
    category = Category.get_by_id(id)
    return category.serialize


@bp.route('/categories/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        Service.delete().where(Service.category == id).execute()
        Category.delete_by_id(id)
    return jsonify(id)


@bp.route('/services', methods=['GET'])
def list_services():
    category = request.args.getlist('category')
    query = (
        Service.select().where(Service.category == category)
    )
    return [s.serialize for s in query]


@bp.route('/services/<int:id>', methods=['GET'])
def get_service(id):
    return Service.get_by_id(id).serialize


@bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    service = Service.create(**data)
    return service.serialize


@bp.route('/services/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Service.update(**data).where(Service.id == id).execute()
    service = Service.get_by_id(id)
    return service.serialize


@bp.route('/services/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Service.delete_by_id(id)
    return jsonify(id)


@bp.route('/subjects', methods=['GET'])
def list_subjects():
    query = (
        Subject.select()
    )
    return [s.serialize for s in query]


@bp.route('/subjects/<code>', methods=['GET'])
def get_subject(code):
    return Subject.get(Subject.code == code).serialize


@bp.route('/user/contractors', methods=['GET', 'POST'])
@jwt_required()
def list_contractors():
    contractors = (
        Contractor
        .select()
        .join(ContractorUser)
        .join(User)
    )

    if not current_user.admin:
        contractors = contractors.where(User.id == current_user.id)

    if request.method == 'POST':
        data = request.get_json()
        current_app.logger.error(data)
        catalogue = data.pop('catalogue', None)
        geography = data.pop('geography', None)
        if not current_user.admin:
            data.pop('comment', None)
        if contractors.count() == 0:
            contractor = Contractor.create(**data)
            ContractorUser.create(contractor=contractor, user=current_user)
        else:
            contractor = contractors.first()
            if data.keys() or catalogue is not None or geography is not None:
                data['status'] = STATUS_MODIFIED
            if data.keys():
                contractor.update(**data).where(Contractor.id == contractor.id).execute()
                contractor.reload()
        if catalogue is not None:
            Catalogue.delete().where(Catalogue.contractor == contractor, ~(Catalogue.service << catalogue)).execute()
            existing = [s[0] for s in Catalogue.select(Catalogue.service).where(Catalogue.contractor == contractor, Catalogue.service << catalogue).distinct().tuples()]
            for key in catalogue:
                if key not in existing:
                    Catalogue.create(contractor=contractor, service=key)
        if geography is not None:
            Geography.delete().where(Geography.contractor == contractor).execute()
            for code in geography:
                Geography.create(contractor=contractor, subject=code)
    elif contractors is None:
        return []
    data = [contractor.serialize for contractor in contractors]
    if not current_user.admin:
        for item in data:
            item.pop('comment', None)
    return data


@bp.route('/user/contractors/<int:id>', methods=['GET'])
@jwt_required()
def get_contractor(id):
    contractor = (
        Contractor
        .select(Contractor, User)
        .where(Contractor.id == id)
        .join(ContractorUser)
        .join(User)
        .get()
    )

    data = contractor.serialize
    if not current_user.admin:
        data.pop('comment', None)
    return data


@bp.route('/user/contractors/<int:id>', methods=['PUT'])
@jwt_required()
def update_contractor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    catalogue = data.pop('catalogue', None)
    geography = data.pop('geography', None)

    Contractor.update(**data).where(Contractor.id == id).execute()

    if catalogue is not None:
        Catalogue.update(approved=False).where(Catalogue.contractor == id, ~(Catalogue.service << catalogue)).execute()
        Catalogue.update(approved=True).where(Catalogue.contractor == id, Catalogue.service << catalogue).execute()

    if geography is not None:
        Geography.update(approved=False).where(Geography.contractor == id, ~(Geography.subject << geography)).execute()
        Geography.update(approved=True).where(Geography.contractor == id, Geography.subject << geography).execute()

    contractor = Contractor.get_by_id(id)

    return contractor.serialize


@bp.route('/user/contractors/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_contractor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        Catalogue.delete().where(Catalogue.contractor == id).execute()
        Geography.delete().where(Geography.contractor == id).execute()
        ContractorUser.delete().where(ContractorUser.contractor == id).execute()
        Contractor.delete_by_id(id)

    return jsonify(id)


@bp.route('/user/files/<user>/<filename>', methods=['GET'])
@jwt_required()
def download_file(user, filename):
    if not current_user.admin and current_user.id != user:
        return jsonify(msg='Доступ запрещён'), 401

    dirname = os.path.join(current_app.config['USER_UPLOAD_FOLDER'], str(user))
    return send_from_directory(dirname, filename)


@bp.route('/user/files', methods=['POST'])
@jwt_required()
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(msg='File missing'), 400

    file = request.files['file']
    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify(msg='File missing'), 400

    dirname = os.path.join(current_app.config['USER_UPLOAD_FOLDER'], str(current_user.id))
    os.makedirs(dirname, exist_ok=True)
    filename = secure_file_name.sub('-', file.filename)
    file.save(os.path.join(dirname, filename))
    return {'name': filename}
