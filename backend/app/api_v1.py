#!/usr/bin/env python3
"""app blueprint"""

from flask import Blueprint
from flask_restful import Api
from app.resources.auth import Register, Login, Logout, SendOTPResource


api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(SendOTPResource, '/send_otp')
