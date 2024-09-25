from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from peewee import fn

from ..models import ServiceCategory, Service, ServiceFile

bp = Blueprint('service', __name__, url_prefix='/services')


@bp.route('categories', methods=['GET'])
def list_categories():
    query = (
        ServiceCategory.select().order_by(ServiceCategory.seq)
    )
    return [c.serialize for c in query]


@bp.route('categories', methods=['POST'])
@jwt_required()
def create_category():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    if ServiceCategory.select().count() > 0:
        seq = ServiceCategory.select(fn.Max(ServiceCategory.seq)).scalar() + 1
    else:
        seq = 1
    category = ServiceCategory.create(**data, seq=seq)
    return category.serialize


@bp.route('categories/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    ServiceCategory.update(**data).where(ServiceCategory.id == id).execute()
    category = ServiceCategory.get_by_id(id)
    return category.serialize


@bp.route('categories/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    if Service.select().where(Service.category == id).count() > 0:
        return jsonify(msg='Категория должна быть пустой'), 400

    ServiceCategory.delete_by_id(id)
    return jsonify(id)


@bp.route('', methods=['GET'])
def list_services():
    category = request.args.getlist('category')
    query = (
        Service.select().where(Service.category == category)
    )
    return [s.serialize for s in query]


@bp.route('<int:id>', methods=['GET'])
def get_service(id):
    return Service.get_by_id(id).serialize


@bp.route('<int:id>/files', methods=['GET'])
def get_service_files(id):
    query = (
        ServiceFile.select().where(ServiceFile.service == id).order_by(ServiceFile.seq)
    )
    return [f.serialize for f in query]


@bp.route('', methods=['POST'])
@jwt_required()
def create_service():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    service = Service.create(**data)
    return service.serialize


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Service.update(**data).where(Service.id == id).execute()
    service = Service.get_by_id(id)
    return service.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Service.delete_by_id(id)
    return jsonify(id)
