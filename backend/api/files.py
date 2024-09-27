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


@bp.route('/get/<scope>/<int:id>', methods=['GET'])
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


@bp.route('/<scope>/<instance>', methods=['GET'])
# @jwt_required()
def list_files(scope, instance):
    if scope not in SCOPES:
        return jsonify(msg='Unknown scope'), 400

    model = SCOPES[scope]['model']
    files = model.select().where(SCOPES[scope]['instance'] == instance)
    if SCOPES[scope]['sorted']:
        seq_field = getattr(model, 'seq')
        files = files.order_by(seq_field)
    if files is None:
        return []
    return [f.serialize for f in files]


@bp.route('/reorder/<scope>/<instance>', methods=['PUT'])
# @jwt_required()
def reorder_files(scope, instance):
    if scope not in SCOPES:
        return jsonify(msg='Unknown scope'), 400

    if not SCOPES[scope]['sorted']:
        return jsonify(msg='Unsorted scope'), 400

    model = SCOPES[scope]['model']
    id_field = getattr(model, 'id')
    seq_field = getattr(model, 'seq')

    data = request.get_json()
    current_app.logger.error(data)
    seq = 1
    for item in data:
        model.update(seq=seq).where(id_field == item['id']).execute()
        seq = seq + 1

    files = model.select().where(SCOPES[scope]['instance'] == instance).order_by(seq_field)
    return [f.serialize for f in files]


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
        if file_object is not None:
            old_file_path = os.path.join(current_app.config['FILES_FOLDER'], scope, instance, file_object.file)
            if old_file_path != file_path:
                try:
                    os.remove(old_file_path)
                except FileNotFoundError:
                    pass
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


@bp.route('/<scope>/<instance>/<file>', methods=['DELETE'])
# @jwt_required()
def delete_file(scope, instance, file):
    if scope not in SCOPES:
        return jsonify(msg='Unknown scope'), 400

    model = SCOPES[scope]['model']
    file_field = getattr(model, 'file')
    file_object = model.select().where(SCOPES[scope]['instance'] == instance, file_field == file).first()
    if file_object is None:
        return jsonify(msg='Файл не найден'), 404

    file_path = os.path.join(current_app.config['FILES_FOLDER'], scope, instance, file)
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass
    file_object.delete_instance()

    files = model.select().where(SCOPES[scope]['instance'] == instance)
    if SCOPES[scope]['sorted']:
        seq_field = getattr(model, 'seq')
        files = files.order_by(seq_field)
    if files is None:
        return []
    return [f.serialize for f in files]