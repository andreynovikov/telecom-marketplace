from flask import Blueprint, current_app, jsonify
from peewee import PeeweeException, DoesNotExist

from .brand import bp as brand_bp
from .cart import bp as cart_bp
from .contractor import bp as contractor_bp
from .files import bp as files_bp
from .order import bp as order_bp
from .price_factor import bp as price_factor_bp
from .product import bp as product_bp
from .service import bp as service_bp
from .subject import bp as subject_bp
from .user import bp as user_bp


bp = Blueprint('api', __name__)
bp.register_blueprint(brand_bp)
bp.register_blueprint(cart_bp)
bp.register_blueprint(contractor_bp)
bp.register_blueprint(files_bp)
bp.register_blueprint(order_bp)
bp.register_blueprint(price_factor_bp)
bp.register_blueprint(product_bp)
bp.register_blueprint(service_bp)
bp.register_blueprint(subject_bp)
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
