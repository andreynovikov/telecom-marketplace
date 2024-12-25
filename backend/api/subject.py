from flask import Blueprint

from models import Subject

bp = Blueprint('subject', __name__, url_prefix='/subjects')


@bp.route('', methods=['GET'])
def list_subjects():
    query = (
        Subject.select()
    )
    return [s.serialize for s in query]


@bp.route('<code>', methods=['GET'])
def get_subject(code):
    return Subject.get(Subject.code == code).serialize
