import os

from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from peewee import PeeweeException
from werkzeug.utils import secure_filename

from .models import Category, Service, User, Contractor, ContractorUser


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


@bp.route('/user/contractors', methods=['GET', 'POST'])
@jwt_required()
def contractors():
    contractor = (
        Contractor
        .select()
        .join(ContractorUser)
        .join(User)
        .where(User.id == current_user.id)
        .first()
    )

    if request.method == 'POST':
        data = request.get_json()
        if contractor is None:
            contractor = Contractor.create(**data)
            ContractorUser.create(contractor=contractor, user=current_user)
        else:
            contractor.update(**data).execute()
            contractor.reload()
    elif contractor is None:
        return {}
    return contractor.serialize


@bp.route('/user/files', methods=['POST'])
@jwt_required()
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(msg='File missing'), 400

    file = request.files['file']
    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify(msg='File missing'), 400

    dirname = os.path.join(current_app.config['USER_UPLOAD_FOLDER'], str(current_user.id))
    os.makedirs(dirname, exist_ok=True)
    filename = secure_filename(file.filename)
    file.save(os.path.join(dirname, filename))
    return {'name': filename}
