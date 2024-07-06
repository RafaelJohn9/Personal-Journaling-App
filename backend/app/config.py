#!/usr/bin/env python
""" This file contains the configuration settings for the application."""

from datetime import timedelta
import os


class Config:
    """ This class contains the configuration settings for the application."""
    # env var
    DB_USERNAME_PASSWORD = os.getenv("DB_USERNAME_PASSWORD", "johnmkagunda:")

    # configuration
    SECRET_KEY =  os.getenv('SECRET_KEY', "secret key")
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{DB_USERNAME_PASSWORD}@localhost/journaling_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "secretkey")
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_COOKIE_PATH = '/'
    JWT_COOKIE_SECURE = False  # Set to True in production to use HTTPS
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(int(os.getenv('ACCESS_TOKEN_EXPIRES', '30')))
