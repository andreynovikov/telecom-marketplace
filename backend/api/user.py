from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from ..models import db_wrapper, Contractor, ContractorUser, User

bp = Blueprint('user', __name__, url_prefix='/users')


@bp.route('', methods=['GET'])
@jwt_required()
def list_users():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    query = (
        User.select()
    )
    return [u.serialize for u in query]


@bp.route('', methods=['POST'])
@jwt_required()
def create_user():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    user = User.create(**data)
    return user.serialize


@bp.route('<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    if current_user.id != id and not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    user = User.get_by_id(id)

    return user.serialize


@bp.route('<int:id>/contractors', methods=['GET'])
@jwt_required()
def get_user_contractors(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    contractors = (
        Contractor
        .select(Contractor.id, Contractor.status)
        .join(ContractorUser)
        .join(User)
        .where(User.id == id)
        .distinct()
    )

    return [{'id': contractor.id, 'status': contractor.status} for contractor in contractors]


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    if current_user.id != id and not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()

    if not current_user.admin:
        data.pop('admin')
        data.pop('provider')
        data.pop('consumer')

    if 'password' in data:
        password = data.get('password')
        del data['password']
    User.set_by_id(id, data)
    user = User.get_by_id(id)
    if 'password' in locals():
        user.password = password
        user.save()
    return user.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        User.delete_by_id(id)
    return jsonify(id)
