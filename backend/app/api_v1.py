#!/usr/bin/env python3
"""app blueprint"""

from flask import Blueprint
from flask_restful import Api
from app.resources.auth import (
        Register, Login, Logout, SendOTPResource,
        OTPVerificationResource, CheckUserExists,UpdatePassword
)
from app.resources.journal_endpoints import JournalListResource, JournalResource


api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# User Auth endpoints
# require no tokens
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(SendOTPResource, '/send_otp')
api.add_resource(OTPVerificationResource, '/verify_otp')
api.add_resource(CheckUserExists, '/check_user_exists')
# require tokens
api.add_resource(UpdatePassword, '/update_password')
api.add_resource(Logout, '/logout')


# Journal endpoints
api.add_resource(JournalListResource, '/journals')
api.add_resource(JournalResource, '/journals/<int:journal_id>')
