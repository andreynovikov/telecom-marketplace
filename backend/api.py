import os

from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from peewee import fn, PeeweeException, DoesNotExist
from werkzeug.utils import secure_filename

from .models import db_wrapper, Category, Service, Subject, User, Contractor, Geography, ContractorUser


bp = Blueprint('api', __name__)


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


@bp.route('/categories/<id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Category.update(**data).where(Category.id == id).execute()
    category = Category.get_by_id(id)
    return category.serialize


@bp.route('/categories/<id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        Service.delete().where(Service.category == id).execute()
        Category.delete_by_id(id)
    return id


@bp.route('/services', methods=['GET'])
def list_services():
    category = request.args.getlist('category')
    query = (
        Service.select().where(Service.category == category)
    )
    return [s.serialize for s in query]


@bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    service = Service.create(**data)
    return service.serialize


@bp.route('/services/<id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Service.update(**data).where(Service.id == id).execute()
    service = Service.get_by_id(id)
    return service.serialize


@bp.route('/services/<id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Service.delete_by_id(id)
    return id


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
        geography = data.pop('geography', None)
        if contractors.count() == 0:
            contractor = Contractor.create(**data)
            ContractorUser.create(contractor=contractor, user=current_user)
        else:
            contractor = contractors.first()
            if data.keys():
                contractor.update(**data).where(Contractor.id == contractor.id).execute()
                contractor.reload()
        if geography is not None:
            Geography.delete().where(Geography.contractor == contractor).execute()
            for code in geography:
                subject = Subject.get(Subject.code == code)
                Geography.create(contractor=contractor, subject=subject)
    elif contractors is None:
        return []
    return [contractor.serialize for contractor in contractors]


@bp.route('/user/contractors/<id>', methods=['GET'])
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

    import logging
    logging.error(contractor)

    # if not current_user.admin:
    #     contractor = contractors.where(User.id == current_user.id)

    return contractor.serialize


@bp.route('/user/contractors/<id>', methods=['DELETE'])
@jwt_required()
def delete_contractor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        Geography.delete().where(Geography.contractor == id).execute()
        ContractorUser.delete().where(ContractorUser.contractor == id).execute()
        Contractor.delete_by_id(id)

    return id


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
    filename = secure_filename(file.filename)
    file.save(os.path.join(dirname, filename))
    return {'name': filename}
