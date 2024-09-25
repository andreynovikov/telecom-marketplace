import re
import os

from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import current_user, jwt_required
from peewee import fn

from ..models import ServiceFile, UserFile

secure_file_name = re.compile(r"[/\\?%*:|\"<>\x7F\x00-\x1F]")

bp = Blueprint('file', __name__, url_prefix='/files')

SCOPES = {
    'services': {
        'model': ServiceFile,
        'instance': ServiceFile.service,
        'sorted': True
    },
    'users': {
        'model': UserFile,
        'instance': UserFile.user,
        'sorted': False
    }
}


@bp.route('/<scope>/<int:id>', methods=['GET'])
@jwt_required()
def download_file(scope, id):
    if scope not in SCOPES:
        return jsonify(msg='Unknown scope'), 400

    # if not current_user.admin and current_user.id != user:
    #     return jsonify(msg='Доступ запрещён'), 401

    model = SCOPES[scope]['model']
    id_field = getattr(model, 'id')
    file_object = model.select().where(id_field == id).first()
    if file_object is None:
        return jsonify(msg='Файл не найден'), 404

    instance = getattr(file_object, SCOPES[scope]['instance'].name)
    dirname = os.path.join(current_app.config['FILES_FOLDER'], scope, str(instance.id))
    return send_from_directory(dirname, file_object.file)


@bp.route('/<scope>', defaults={'instance': None}, methods=['POST'])
@bp.route('/<scope>/<instance>', methods=['POST'])
@jwt_required()
def upload_file(scope, instance):
    if scope not in SCOPES:
        return jsonify(msg='Unknown scope'), 400

    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify(msg='File missing'), 400

    file = request.files['file']
    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify(msg='File missing'), 400

    if scope == 'users':
        instance = str(current_user.id)
    dirname = os.path.join(current_app.config['FILES_FOLDER'], scope, instance)
    os.makedirs(dirname, exist_ok=True)
    filename = secure_file_name.sub('-', file.filename)
    file_path = os.path.join(dirname, filename)
    file.save(file_path)

    model = SCOPES[scope]['model']
    file_object = None
    if 'previous' in request.form:
        name_field = getattr(model, 'name')
        file_object = model.select().where(SCOPES[scope]['instance'] == instance, name_field == request.form['previous']).first()
        current_app.logger.error(file_object)
    if file_object is None:
        data = {}
        data[SCOPES[scope]['instance'].name] = instance
        if SCOPES[scope]['sorted']:
            seq_field = getattr(model, 'seq')
            seq = model.select(fn.Max(seq_field)).where(SCOPES[scope]['instance'] == instance).scalar()
            seq = 1 if seq is None else seq + 1
            data['seq'] = seq
        file_object = model(**data)
    file_object.name = file.filename
    file_object.file = filename
    file_object.size = os.stat(file_path).st_size
    file_object.save()

    return file_object.serialize
