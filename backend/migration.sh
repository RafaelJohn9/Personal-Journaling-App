#!/usr/bin/env bash

# Set the Flask application entry point
export FLASK_APP=manage.py

# Prompt for migration message
echo "Enter your migration message:"
read -r message

# Initialize migration repository
flask db init

# Generate and apply migration script
flask db migrate -m "${message}"
flask db upgrade
