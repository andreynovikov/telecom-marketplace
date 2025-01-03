from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from models import db_wrapper, Order, OrderItem, Product

bp = Blueprint('order', __name__, url_prefix='/orders')


@bp.route('', methods=['GET'])
@jwt_required()
def list_orders():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    query = (
        Order.select().order_by(Order.created)
    )
    return [o.serialize for o in query]


@bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()

    price_factor = current_user.get_price_factor()

    with db_wrapper.database.atomic():
        order = Order.create(user=current_user, comment=data.pop('comment'))
        for item in data['items']:
            product = Product.get_by_id(item['product'])
            OrderItem.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=product.price,
                cost=product.price * price_factor
            )

    return order.serialize


@bp.route('<int:id>', methods=['GET'])
@jwt_required()
def get_order(id):
    order = Order.get_by_id(id)
    if current_user.id != order.user.id and not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    return order.serialize


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_order(id):
    order = Order.get_by_id(id)
    if current_user.id != order.user.id and not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()

    if not current_user.admin:
        data.pop('status')
        data.pop('created')

    Order.set_by_id(id, data)
    order = Order.get_by_id(id)
    return order.serialize
