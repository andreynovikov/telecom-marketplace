from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from models import Brand

bp = Blueprint('brand', __name__, url_prefix='/brands')


@bp.route('', methods=['GET'])
def list_brands():
    query = (
        Brand.select()
    )
    return [b.serialize for b in query]


@bp.route('<int:id>', methods=['GET'])
def get_brand(id):
    return Brand.get_by_id(id).serialize


@bp.route('', methods=['POST'])
@jwt_required()
def create_brand():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    brand = Brand.create(**data)
    return brand.serialize


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_brand(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Brand.update(**data).where(Brand.id == id).execute()
    brand = Brand.get_by_id(id)
    return brand.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_brand(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Brand.delete_by_id(id)
    return jsonify(id)
