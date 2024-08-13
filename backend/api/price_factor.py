from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from ..models import PriceFactor

bp = Blueprint('price_factor', __name__, url_prefix='/price-factors')


@bp.route('', methods=['GET'])
def list_price_factors():
    query = (
        PriceFactor.select().order_by(PriceFactor.factor.desc())
    )
    return [f.serialize for f in query]


@bp.route('<int:id>', methods=['GET'])
def get_price_factor(id):
    return PriceFactor.get_by_id(id).serialize


@bp.route('', methods=['POST'])
@jwt_required()
def create_price_factor():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    factor = PriceFactor.create(**data)
    return factor.serialize


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_price_factor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    PriceFactor.update(**data).where(PriceFactor.id == id).execute()
    factor = PriceFactor.get_by_id(id)
    return factor.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_price_factor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    PriceFactor.delete_by_id(id)
    return jsonify(id)
