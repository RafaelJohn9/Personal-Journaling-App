#!/usr/bin/env python3
"""app blueprint"""

from flask import Blueprint
from flask_restful import Api
from app.resources.auth import Register, Login, Logout, SendOTPResource, OTPVerificationResource
from app.resources.journal_endpoints import JournalListResource, JournalResource


api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# User Auth endpoints
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(SendOTPResource, '/send_otp')
api.add_resource(OTPVerificationResource, '/verify_otp')

# Journal endpoints
api.add_resource(JournalListResource, '/journals')
api.add_resource(JournalResource, '/journals/<int:journal_id>')
