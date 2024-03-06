from flask import Blueprint, current_app, jsonify
from peewee import PeeweeException


bp = Blueprint('api', __name__)


@bp.errorhandler(PeeweeException)
def handle_data_error(e):
    current_app.logger.error(str(e))
    return jsonify(error=str(e)), 400


@bp.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404
