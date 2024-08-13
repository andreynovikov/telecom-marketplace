import re
import os

from flask import Blueprint, current_app, jsonify, request, send_from_directory
from flask_jwt_extended import current_user, jwt_required

secure_file_name = re.compile(r"[/\\?%*:|\"<>\x7F\x00-\x1F]")

bp = Blueprint('file', __name__, url_prefix='/user/files')


@bp.route('/<user>/<filename>', methods=['GET'])
@jwt_required()
def download_file(user, filename):
    if not current_user.admin and current_user.id != user:
        return jsonify(msg='Доступ запрещён'), 401

    dirname = os.path.join(current_app.config['USER_UPLOAD_FOLDER'], str(user))
    return send_from_directory(dirname, filename)


@bp.route('', methods=['POST'])
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
    filename = secure_file_name.sub('-', file.filename)
    file.save(os.path.join(dirname, filename))
    return {'name': filename}
