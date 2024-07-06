""" errors definition """
# pylint: disable=unused-argument
from flask import jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError

class InvalidUsage(Exception):
    """ Class that handles invalid usage exceptions """
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        """ attributes definition """
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """ converting payload to dict  """
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def register_error_handlers(app):
    """ Main error handler """
    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):
        """ handles invalid usage """
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(404)
    def not_found_error(error):
        """ handles 404 error """
        response = jsonify({'message': 'Resource not found'})
        response.status_code = 404
        return response

    @app.errorhandler(500)
    def internal_error(error):
        """ hanldes internal server error """
        response = jsonify({'message': 'Internal server error'})
        response.status_code = 500
        return response

    @app.errorhandler(NoAuthorizationError)
    def handle_no_authorization_error(error):
        """ handles no authorization error """
        response = jsonify({'message': 'Missing or invalid authorization token'})
        response.status_code = 401
        return response
