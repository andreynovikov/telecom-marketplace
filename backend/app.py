from datetime import datetime, timedelta

from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, set_access_cookies

from .models import bcrypt, db_wrapper, jwt, thumbnail, setup_db


cors = CORS()


def create_app(context=None):
    # Load configuration from environment
    load_dotenv()

    # Initialize flask
    app = Flask(__name__)
    app.config.from_prefixed_env()
    app.config.update({
        'JWT_TOKEN_LOCATION': ('headers', 'cookies'),
        'JWT_ACCESS_TOKEN_EXPIRES': timedelta(hours=2400),  # TODO: Refactor with refresh token
        'JWT_COOKIE_CSRF_PROTECT': False  # TODO: FIX!
    })
    if context:
        app.config.update(context)
    cors.init_app(app, supports_credentials=True)
    bcrypt.init_app(app)
    jwt.init_app(app)
    thumbnail.init_app(app)

    # Initialize database
    db_wrapper.init_app(app)
    setup_db(app)
    db = db_wrapper.database

    @app.before_request
    def _db_connect():
        if db.is_closed():
            db.connect()

    @app.after_request
    def _refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.utcnow()
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response

    @app.teardown_request
    def _db_close(e):
        if not db.is_closed():
            db.close()

    @app.route('/healthcheck', methods=['GET'])
    def healthcheck():
        database = {**db.connect_params}
        if ('password' in database):
            database['password'] = '*****'
        database['connected'] = db.is_connection_usable()
        database['name'] = db.database

        if database['connected']:
            status = 'ok'
        else:
            status = 'failure'

        return {
            'debug': app.config['DEBUG'],
            'database': database,
            'status': status
        }

    @app.route('/media/<path:path>')
    def media(path):
        return send_from_directory(
            app.config['MEDIA_FOLDER'],
            path,
            as_attachment=False
        )

    from .api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v0')

    from .auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/v0/auth')

    from .admin import create_admin
    create_admin(app)

    from .api.files import setup_files
    setup_files(app)

    return app
