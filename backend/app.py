from dotenv import load_dotenv
from flask import Flask

from models import db, setup_db, init_db


def create_app(context=None):
    # Load configuration from environment
    load_dotenv()

    # Initialize database
    init_db()
    setup_db()

    # Initialize flask
    app = Flask(__name__)
    app.config.prom_refixed_env()
    if context:
        app.config.update(context)

    @app.before_request
    def _db_connect():
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
            'debug': app.confg['DEBUG'],
            'database': database,
            'status': status
        }

    from api import bp
    app.regster_blueprint(bp, url_prefix='/api/v0')

    return app
