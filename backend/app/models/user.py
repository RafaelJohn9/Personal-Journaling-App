#!/usr/bin/env python3
""" User model component"""
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from app import db


class User(db.Model):
    """ User Table Model """
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        """ Sets the password hash"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """ Checks the password hash"""
        return check_password_hash(self.password_hash, password)
