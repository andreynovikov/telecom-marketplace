from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from peewee import fn, Expression, SQL
from playhouse.postgres_ext import TS_MATCH

from ..models import ProductCategory, Product

bp = Blueprint('product', __name__, url_prefix='/products')


@bp.route('categories', methods=['GET'])
def list_categories():
    query = (
        ProductCategory.select().order_by(ProductCategory.parent, ProductCategory.seq)
    )
    return [c.serialize for c in query]


@bp.route('categories', methods=['POST'])
@jwt_required()
def create_category():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    if ProductCategory.select().count() > 0:
        seq = ProductCategory.select(fn.Max(ProductCategory.seq)).scalar() + 1
    else:
        seq = 1
    category = ProductCategory.create(**data, seq=seq)
    return category.serialize


@bp.route('categories/<int:id>', methods=['GET'])
def get_category(id):
    return ProductCategory.get_by_id(id).serialize


@bp.route('categories/<int:id>', methods=['PUT'])
@jwt_required()
def update_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    before = data.pop('before', None)
    ProductCategory.update(**data).where(ProductCategory.id == id).execute()
    if before is not None:
        if int(before) < 0:
            seq = ProductCategory.select(ProductCategory.seq).where(ProductCategory.id == id).scalar()
            ProductCategory.update(seq=ProductCategory.seq - 1).where(ProductCategory.seq >= seq).execute()
            seq = ProductCategory.select(fn.Max(ProductCategory.seq)).scalar() + 1
        else:
            seq = ProductCategory.select(ProductCategory.seq).where(ProductCategory.id == before).scalar()
            ProductCategory.update(seq=ProductCategory.seq + 1).where(ProductCategory.seq >= seq).execute()
        ProductCategory.update(seq=seq).where(ProductCategory.id == id).execute()
    category = ProductCategory.get_by_id(id)
    return category.serialize


@bp.route('categories/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    if ProductCategory.select().where(ProductCategory.parent == id).count() > 0:
        return jsonify(msg='Удаление невозможно: категория содержит подкатегории'), 400
    if Product.select().where(Product.category == id).count() > 0:
        return jsonify(msg='Удаление невозможно: категория содержит товары'), 400

    ProductCategory.delete_by_id(id)
    return jsonify(id)


@bp.route('', methods=['GET'])
def list_products():
    products = (
        Product.select().order_by(Product.name, Product.id)
    )

    for field, values in request.args.lists():
        if field == 'category':
            products = products.where(Product.category == values)
        if field == 'text':
            query = fn.plainto_tsquery('russian', values[0]).alias('query')
            products = (
                products
                .select(Product, fn.ts_rank_cd(Product.fts_vector, SQL('query')).alias('rank'))
                .from_(Product, query)
                .where(Expression(Product.fts_vector, TS_MATCH, query))
                .order_by(SQL('rank').desc())
            )
            # sql = products.sql()
            # print(sql[0] % tuple(sql[1]))

    return [p.serialize for p in products]


@bp.route('<int:id>', methods=['GET'])
def get_product(id):
    return Product.get_by_id(id).serialize


@bp.route('', methods=['POST'])
@jwt_required()
def create_product():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    product = Product.create(**data)
    product.update_fts_vector()
    return product.serialize


@bp.route('<int:id>', methods=['POST'])
@jwt_required()
def update_product(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    Product.update(**data).where(Product.id == id).execute()
    product = Product.get_by_id(id)
    product.update_fts_vector()
    return product.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Product.delete_by_id(id)
    return jsonify(id)


@bp.route('<int:id>/related', methods=['GET'])
def list_related_products(id):
    product = Product.get_by_id(id)
    related = []

    category = product.category
    while len(related) < 4:
        related.extend(list(Product.select().where(Product.id != id, Product.category == category).order_by(fn.Random()).limit(4 - len(related))))
        if category.parent is None:
            break
        category = category.parent

    if len(related) < 4:
        related.extend(list(Product.select().where(Product.id != id).order_by(fn.Random()).limit(4 - len(related))))

    return [p.serialize for p in related]
