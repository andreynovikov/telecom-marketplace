from flask import Blueprint, current_app, request
from flask_jwt_extended import current_user, jwt_required

from ..models import Cart, Product

bp = Blueprint('cart', __name__, url_prefix='/cart')


@bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    items = (
        Cart
        .select(Cart, Product)
        .join(Product)
        .where(Cart.user == current_user.id)
        .order_by(Cart.id)
        .distinct()
    )
    if items is None:
        return []
    return [item.serialize for item in items]


@bp.route('', methods=['PUT'])
@jwt_required()
def update_cart_item():
    data = request.get_json()
    current_app.logger.warn(data)
    if data['quantity'] < 1:
        Cart.delete().where(Cart.user == current_user, Cart.product == data['product']).execute()
    else:
        item = (
            Cart
            .select()
            .where(Cart.user == current_user, Cart.product == data['product'])
            .first()
        )

        if item is None:
            Cart.create(user=current_user, **data)
        else:
            item.quantity = data['quantity']
            item.save()

    return get_cart()


@bp.route('', methods=['DELETE'])
@jwt_required()
def delete_cart():
    Cart.delete().where(Cart.user == current_user).execute()
    return []
