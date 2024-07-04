#!/usr/bin/env python3
"""
This module component is used for authorization purposes.
"""
from datetime import datetime, timedelta, timezone
from flask import request, jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt, unset_jwt_cookies, decode_token
)
from app import db, redis_conn
from app.models.user import User
from app.utils.otp import  generate_otp, store_otp_in_redis, send_otp_email

class Register(Resource):
    """ Registers a new user """
    def post(self):
        """ used for user registration """
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        if User.query.filter_by(email=email).first():
            return {'message': 'User already exists'}, 400

        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201

class Login(Resource):
    """ Logs in an existing user """
    def post(self):
        """ used for user login """
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=email)

            # Decode the access token to retrieve its claims
            decoded_token = decode_token(access_token)
            jti = decoded_token["jti"]
            expiration = decoded_token["exp"]

            # Calculate token TTL
            now = datetime.now(timezone.utc)
            ttl = expiration - int(now.timestamp())

            # Store token in Redis
            redis_conn.setex(jti, timedelta(seconds=ttl), email)

            # Set access token as a cookie
            request.jwt_access_token = access_token
            response = {"message": "Login successful"}


            return response, 200

        return {'message': 'Invalid credentials'}, 401

class Logout(Resource):
    """ Logs out a user """
    @jwt_required()
    def post(self):
        """ used for user logout """
        jti = get_jwt()["jti"]
        redis_conn.delete(jti)

        response = jsonify({'message': 'Logout successful'})
        unset_jwt_cookies(response)  # Remove cookies on logout
        return response

class SendOTPResource(Resource):
    """ Sends OTP via email"""
    def post(self):
        """ post method for requesting otp via email"""
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        args = parser.parse_args()

        email = args['email']
        otp = generate_otp()

        store_otp_in_redis(email, otp)
        send_otp_email(email, otp)

        return jsonify(message='OTP sent to your email')

class OTPVerificationResource(Resource):
    """ Verifies the OTP sent to the user's email """
    def post(self):
        """ post method for verifying otp """
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('otp', type=str, required=True, help='OTP is required')
        args = parser.parse_args()

        email = args['email']
        otp = args['otp']

        # Retrieve the stored OTP from Redis
        stored_otp = redis_conn.get(email)

        if stored_otp and stored_otp.decode('utf-8') == otp:
            return jsonify(message='OTP verification successful'), 200
        else:
            return {'message': 'OTP verification failed'}, 400
