import os

from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from ..models import Product

bp = Blueprint('product', __name__, url_prefix='/products')


@bp.route('', methods=['GET'])
def list_products():
    query = (
        Product.select()
    )
    return [b.serialize for b in query]


@bp.route('<int:id>', methods=['GET'])
def get_product(id):
    return Product.get_by_id(id).serialize


@bp.route('', methods=['POST'])
@jwt_required()
def create_product():
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.form.to_dict()  # will not correctrly process multiple values
    product = Product.create(**data)

    if 'image' in request.files and request.files['image'].filename != '':
        file = request.files['image']
        extension = os.path.splitext(file.filename)[1]
        filename = data['code'] + extension
        file.save(os.path.join(current_app.config['MEDIA_FOLDER'], 'products', filename))
        product.image = filename
        product.save()

    return product.serialize


@bp.route('<int:id>', methods=['POST'])
@jwt_required()
def update_product(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    product = Product.get_by_id(id)

    data = request.form.to_dict()  # will not correctrly process multiple values
    current_app.logger.error(data)
    Product.update(**data).where(Product.id == id).execute()

    code_changed = product.code != data['code']
    has_image = 'image' in request.files and request.files['image'].filename != ''
    should_reload = False

    if has_image:
        if product.image and product.code != data['code']:
            os.remove(os.path.join(current_app.config['MEDIA_FOLDER'], 'products', product.image))
        file = request.files['image']
        extension = os.path.splitext(file.filename)[1]
        filename = data['code'] + extension
        file.save(os.path.join(current_app.config['MEDIA_FOLDER'], 'products', filename))
        Product.update(image=filename).where(Product.id == id).execute()
        should_reload = True
    elif code_changed and product.image:
        extension = os.path.splitext(product.image)[1]
        filename = data['code'] + extension
        current_app.logger.error(product.image + ' ' + extension + ' ' + filename)
        os.rename(
            os.path.join(current_app.config['MEDIA_FOLDER'], 'products', product.image),
            os.path.join(current_app.config['MEDIA_FOLDER'], 'products', filename)
        )
        Product.update(image=filename).where(Product.id == id).execute()
        should_reload = True

    if should_reload:
        product = Product.get_by_id(id)

    return product.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    Product.delete_by_id(id)
    return id
