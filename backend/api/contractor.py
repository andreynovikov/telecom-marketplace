from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import current_user, jwt_required

from ..models import db_wrapper, Contractor, Catalogue, Geography, ContractorUser, User
from ..models import STATUS_MODIFIED

bp = Blueprint('contractor', __name__, url_prefix='/contractors')


@bp.route('', methods=['GET', 'POST'])
@jwt_required()
def list_contractors():
    contractors = (
        Contractor
        .select()
        .join(ContractorUser)
        .join(User)
    )

    if not current_user.admin:
        contractors = contractors.where(User.id == current_user.id)

    for field, values in request.args.lists():
        if field == 'kind':
            contractors = contractors.where(Contractor.kind == values[0])

    if request.method == 'POST':
        data = request.get_json()
        current_app.logger.error(data)
        catalogue = data.pop('catalogue', None)
        geography = data.pop('geography', None)
        if not current_user.admin:
            data.pop('comment', None)
            data.pop('price_factor', None)
        if contractors.count() == 0:
            contractor = Contractor.create(**data)
            ContractorUser.create(contractor=contractor, user=current_user)
        else:
            contractor = contractors.first()
            if data.keys() or catalogue is not None or geography is not None:
                data['status'] = STATUS_MODIFIED
            if data.keys():
                contractor.update(**data).where(Contractor.id == contractor.id).execute()
                contractor.reload()
        if catalogue is not None:
            Catalogue.delete().where(Catalogue.contractor == contractor, ~(Catalogue.service << catalogue)).execute()
            existing = [s[0] for s in Catalogue.select(Catalogue.service).where(Catalogue.contractor == contractor, Catalogue.service << catalogue).distinct().tuples()]
            for key in catalogue:
                if key not in existing:
                    Catalogue.create(contractor=contractor, service=key)
        if geography is not None:
            Geography.delete().where(Geography.contractor == contractor).execute()
            for code in geography:
                Geography.create(contractor=contractor, subject=code)
    elif contractors is None:
        return []
    data = [contractor.serialize for contractor in contractors]
    if not current_user.admin:
        for item in data:
            item.pop('comment', None)
            item.pop('price_factor', None)
    return data


@bp.route('<int:id>', methods=['GET'])
@jwt_required()
def get_contractor(id):
    contractor = (
        Contractor
        .select(Contractor, User)
        .where(Contractor.id == id)
        .join(ContractorUser)
        .join(User)
        .get()
    )

    data = contractor.serialize
    if not current_user.admin:
        data.pop('comment', None)
        data.pop('price_factor', None)
    return data


@bp.route('<int:id>', methods=['PUT'])
@jwt_required()
def update_contractor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    data = request.get_json()
    catalogue = data.pop('catalogue', None)
    geography = data.pop('geography', None)

    Contractor.update(**data).where(Contractor.id == id).execute()

    if catalogue is not None:
        Catalogue.update(approved=False).where(Catalogue.contractor == id, ~(Catalogue.service << catalogue)).execute()
        Catalogue.update(approved=True).where(Catalogue.contractor == id, Catalogue.service << catalogue).execute()

    if geography is not None:
        Geography.update(approved=False).where(Geography.contractor == id, ~(Geography.subject << geography)).execute()
        Geography.update(approved=True).where(Geography.contractor == id, Geography.subject << geography).execute()

    contractor = Contractor.get_by_id(id)

    return contractor.serialize


@bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_contractor(id):
    if not current_user.admin:
        return jsonify(msg='Доступ запрещён'), 401

    with db_wrapper.database.atomic():
        Catalogue.delete().where(Catalogue.contractor == id).execute()
        Geography.delete().where(Geography.contractor == id).execute()
        ContractorUser.delete().where(ContractorUser.contractor == id).execute()
        Contractor.delete_by_id(id)

    return jsonify(id)
