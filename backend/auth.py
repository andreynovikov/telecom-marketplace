from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, current_user, jwt_required, set_access_cookies, unset_jwt_cookies

from .models import bcrypt, User


bp = Blueprint('auth', __name__)


@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    # check if user already exists
    user = User.select().filter(User.email == email).first()
    if user:
        return jsonify(msg='User already exists, please Log in'), 409

    # create user
    user = User(
        email=email,
        password=data.get('password')
    )
    user.save()
    # generate the access token
    access_token = create_access_token(identity=user)
    response = jsonify(msg='Registration successful')
    set_access_cookies(response, access_token)
    return response, 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # fetch the user data
    user = User.select().filter(
        email=data.get('email')
    ).first()
    if user:
        if bcrypt.check_password_hash(user.password, data.get('password')):
            access_token = create_access_token(identity=user)
            response = jsonify(access_token=access_token)
            set_access_cookies(response, access_token)  # cookies are used for admin interface
            return response
        else:
            return jsonify(msg='Wrong password'), 401
    else:
        return jsonify(msg='User does not exist'), 401


@bp.route('/status', methods=['GET'])
@jwt_required()
def status():
    return {
        'user_id': current_user.id,
        'email': current_user.email,
        'admin': current_user.admin
    }


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # TODO: mark the token as blacklisted
    response = jsonify(msg='Successfully logged out')
    unset_jwt_cookies(response)
    return response
