#!/usr/bin/python3
""" start point for the app """
import sys
import os
from app import create_app


# avoid import error caused by flask migrations not able to find relative imports
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# start app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
