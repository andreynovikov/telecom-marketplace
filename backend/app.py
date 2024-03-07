from dotenv import load_dotenv
from flask import Flask

from .models import db_wrapper, setup_db


def create_app(context=None):
    # Load configuration from environment
    load_dotenv()

    # Initialize flask
    app = Flask(__name__)
    app.config.from_prefixed_env()
    if context:
        app.config.update(context)

    # Initialize database
    db_wrapper.init_app(app)
    setup_db()
    db = db_wrapper.database

    @app.before_request
    def _db_connect():
        if db.is_closed():
            db.connect()

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

    from .api import bp
    app.register_blueprint(bp, url_prefix='/api/v0')

    from .admin import create_admin
    create_admin(app)

    return app
