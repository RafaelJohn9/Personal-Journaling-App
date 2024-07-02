"""main app file"""
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, set_access_cookies
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
    from app.config import Config  # pylint: disable=import-outside-toplevel
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()

    # Localized import for API blueprint registration
    from app.api_v1 import api_bp  # pylint: disable=import-outside-toplevel
    app.register_blueprint(api_bp, url_prefix='/api/v1')

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):  # pylint: disable=unused-argument
        jti = jwt_payload['jti']
        token_in_redis = redis_conn.get(jti)
        return token_in_redis is None  # Token is blacklisted if not found in Redis

    @app.after_request
    def set_jwt_cookies(response):
        # Check if the response has the custom attribute 'jwt_access_token' set by a resource
        if hasattr(request, 'jwt_access_token'):
            access_token = request.jwt_access_token
            set_access_cookies(response, access_token)
        return response

    return app
