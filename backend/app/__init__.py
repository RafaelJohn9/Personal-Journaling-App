"""main app file"""
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, set_access_cookies, unset_jwt_cookies
from flask_migrate import Migrate
from dotenv import load_dotenv
import redis

db = SQLAlchemy()
jwt = JWTManager()
redis_conn = redis.StrictRedis(host='localhost', port=6379, db=0)

def create_app():
    """Used to create the app: Starting point"""
    app = Flask(__name__)

    # Load environment variables from .env file
    load_dotenv()

    # Localized import for configuration to avoid circular dependencies
    # Use __import__ to dynamically import the Config class
    from app.config import Config # pylint: disable=import-outside-toplevel
    app.config.from_object(Config)
    migrate = Migrate()

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        from app.models import user, journal  # pylint: disable=import-outside-toplevel disable=unused-import
        db.create_all()

    # Localized import for API blueprint registration
    from app.api_v1 import api_bp  # pylint: disable=import-outside-toplevel
    app.register_blueprint(api_bp, url_prefix='/api/v1')

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):  # pylint: disable=unused-argument
        """ checks if tokei is blacklisted in redis """
        jti = jwt_payload['jti']
        token_in_redis = redis_conn.get(jti)
        return token_in_redis is None  # Token is blacklisted if not found in Redis

    @app.after_request
    def set_or_unset_jwt_cookies(response):
        """ Check if cookies should be set or unset based on request context """
        if request.path == '/api/v1/logout':
            unset_jwt_cookies(response)
        elif hasattr(request, 'jwt_access_token'):
            access_token = request.jwt_access_token
            set_access_cookies(response, access_token)
        return response

    return app
