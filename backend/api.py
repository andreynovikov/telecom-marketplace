from flask import Blueprint, current_app, jsonify, request
from peewee import PeeweeException

from .models import Category, Service


bp = Blueprint('api', __name__)


@bp.errorhandler(PeeweeException)
def handle_data_error(e):
    current_app.logger.error(str(e))
    return jsonify(error=str(e)), 400


@bp.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


@bp.route('/categories', methods=['GET'])
def list_categories():
    query = (
        Category.select()
    )
    return [c.serialize for c in query]


@bp.route('/services', methods=['GET'])
def list_services():
    category = request.args.getlist('category')
    query = (
        Service.select().where(Service.category == category)
    )
    return [s.serialize for s in query]
