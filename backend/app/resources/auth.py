#!/usr/bin/env python3
"""
This module component is used for authorization purposes.
"""
# pylint: disable=broad-exception-caught

from datetime import datetime, timedelta, timezone
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt, decode_token, JWTManager,
)
from flask_jwt_extended.exceptions import NoAuthorizationError
from sqlalchemy.exc import SQLAlchemyError
from app import db, redis_conn
from app.models.user import User
from app.utils.otp import generate_otp, store_otp_in_redis, send_otp_email

jwt = JWTManager()

class Register(Resource):
    """Registers a new user"""

    def post(self):
        """Used for user registration

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
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
        except SQLAlchemyError as e:
            db.session.rollback()
            return {'message': 'Database error: ' + str(e)}, 500
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class Login(Resource):
    """Logs in an existing user"""

    def post(self):
        """Used for user login

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
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
        except SQLAlchemyError as e:
            return {'message': 'Database error: ' + str(e)}, 500
        except NoAuthorizationError:
            return {'message': 'Authorization header is missing'}, 401
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class Logout(Resource):
    """Logs out a user"""

    @jwt_required()
    def post(self):
        """Used for user logout

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
            jti = get_jwt()["jti"]
            redis_conn.delete(jti)

            response = {'message': 'Logout successful'}
            return response, 200
        except KeyError:
            return {'message': 'Token not found in Redis'}, 401
        except NoAuthorizationError:
            return {'message': 'Authorization header is missing'}, 401
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class SendOTPResource(Resource):
    """Sends OTP via email"""

    def post(self):
        """Post method for requesting OTP via email

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, required=True, help='Email is required')
            args = parser.parse_args()

            email = args['email']
            otp = generate_otp()

            store_otp_in_redis(email, otp)
            send_otp_email(email, otp)

            return {'message': 'OTP sent to your email'}, 200
        except SQLAlchemyError as e:
            return {'message': 'Database error: ' + str(e)}, 500
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class OTPVerificationResource(Resource):
    """Verifies the OTP sent to the user's email"""

    def post(self):
        """Post method for verifying OTP

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, required=True, help='Email is required')
            parser.add_argument('otp', type=str, required=True, help='OTP is required')
            args = parser.parse_args()

            email = args['email']
            otp = args['otp']

            # Retrieve the stored OTP from Redis
            stored_otp = redis_conn.get(email)

            if stored_otp and stored_otp.decode('utf-8') == otp:
                # Generating an access token after OTP verification

                # Search for user
                user = User.query.filter_by(email=email).first()
                if user:
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
                return {'message': 'OTP verification successful'}, 200
            else:
                return {'message': 'OTP verification failed'}, 400
        except KeyError:
            return {'message': 'OTP not found in Redis'}, 401
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class CheckUserExists(Resource):
    """Checks if a user exists in the database"""

    def post(self):
        """Post method to check if user exists

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
            data = request.get_json()
            email = data.get('email')

            user = User.query.filter_by(email=email).first()
            if user:
                return {'message': 'User exists'}, 200
            else:
                return {'message': 'User does not exist'}, 404
        except SQLAlchemyError as e:
            return {'message': 'Database error: ' + str(e)}, 500
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500

class UpdatePassword(Resource):
    """Updates a user's password"""

    @jwt_required()
    def post(self):
        """Post method to update user's password

        Arguments:
        None

        Returns:
        JSON response with a message and status code
        """
        try:
            data = request.get_json()
            email = data.get('email')
            new_password = data.get('new_password')

            user = User.query.filter_by(email=email).first()
            if user:
                user.set_password(new_password)
                db.session.commit()
                return {'message': 'Password updated successfully'}, 200
            else:
                return {'message': 'User not found'}, 404
        except SQLAlchemyError as e:
            db.session.rollback()
            return {'message': 'Database error: ' + str(e)}, 500
        except NoAuthorizationError:
            return {'message': 'Authorization header is missing'}, 401
        except Exception as e:
            return {'message': 'Internal server error: ' + str(e)}, 500
