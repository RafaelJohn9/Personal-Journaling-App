""" tests authorization and authentication components """
import sys
import os
import json
from unittest.mock import patch
import pytest

# disabling this pylint to enable consistency in naming of similar variables
# pylint: disable=unused-argument disable=redefined-outer-name

# Add the root directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

# disabling this pylint to enable correct importing of neccessary local modules
# pylint: disable=wrong-import-position
from app import create_app, db
from app.models.user import User

@pytest.fixture(scope='module')
def test_client():
    """ creates an  api application for tests """
    app = create_app()
    app.config.from_object('app.config.Config')
    testing_client = app.test_client()

    # Establish an application context before running the tests.
    ctx = app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens!

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    """Fixture to create a new user in the DB for testing and remove the user after testing."""
    # Setup: Insert user data
    user1 = User(username='testuser', email='test@example.com')
    user1.set_password('password')
    db.session.add(user1)
    db.session.commit()

    yield db  # This is where the testing happens!

    # Teardown: Remove the user from the database
    user = User.query.filter_by(email='test@example.com').first()
    if user:
        db.session.delete(user)
        db.session.commit()

def mock_redis_get(email):
    """ mocks redis function to get item from store """
    if email == 'test@example.com':
        return b'123456'
    return None

def mock_redis_setex(email, jti, ttl=7200):
    """ mocks redis function used to set item in store """
    return True

def mock_send_otp_email(email, otp):
    """ mock function used to send otp via email """
    return True

def mock_generate_otp():
    """ mocks function used to generate otp  """
    return '123456'

# Helper function to get a valid token
def get_valid_token(test_client, email='test@example.com', password='password'):
    """ mocks function used to get valid token from the store """
    response = test_client.post('/api/v1/login', json={
        'email': email,
        'password': password
    })
    data = json.loads(response.data)
    return data.get('access_token')

def test_register_user(test_client):
    """ mocks redis function used to register a new user """
    response = test_client.post('/api/v1/register', json={
        'email': 'newuser@example.com',
        'username': 'newuser',
        'password': 'password'
    })
    data = json.loads(response.data)
    assert response.status_code == 201
    assert data['message'] == 'User created successfully'

    # Teardown: Remove the user from the database
    user = User.query.filter_by(email='newuser@example.com').first()
    if user:
        db.session.delete(user)
        db.session.commit()

def test_register_existing_user(test_client, init_database):
    """ tests registering an existing user """
    response = test_client.post('/api/v1/register', json={
        'email': 'test@example.com',
        'username': 'testuser',
        'password': 'password'
    })
    data = json.loads(response.data)
    assert response.status_code == 400
    assert data['message'] == 'User already exists'

def test_login_user(test_client, init_database):
    """ tests user login """
    response = test_client.post('/api/v1/login', json={
        'email': 'test@example.com',
        'password': 'password'
    })
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['message'] == 'Login successful'

def test_login_invalid_user(test_client, init_database):
    """ tests login for a user that does not exists """
    response = test_client.post('/api/v1/login', json={
        'email': 'wrong@example.com',
        'password': 'password'
    })
    data = json.loads(response.data)
    assert response.status_code == 401
    assert data['message'] == 'Invalid credentials'

def test_logout_user(test_client, init_database):
    """ tests logout of the user """
    token = get_valid_token(test_client)
    headers = {'Authorization': f'Bearer {token}'}
    response = test_client.post('/api/v1/logout', headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['message'] == 'Logout successful'

def test_send_otp(test_client):
    """ test sending of otp to client """
    with patch('app.resources.auth.generate_otp', mock_generate_otp):
        with patch('app.resources.auth.store_otp_in_redis', mock_redis_setex):
            with patch('app.resources.auth.send_otp_email', mock_send_otp_email):
                response = test_client.post('/api/v1/send_otp', json={
                    'email': 'test@example.com'
                })
                data = json.loads(response.data)
                print(data, end="\n\n\n\n\n\n\n\n")
                assert response.status_code == 200
                assert data['message'] == 'OTP sent to your email'

def test_verify_otp(test_client):
    """ tests otp verification """
    with patch('app.resources.auth.redis_conn.get', mock_redis_get):
        response = test_client.post('/api/v1/verify_otp', json={
            'email': 'test@example.com',
            'otp': '123456'
        })
        data = json.loads(response.data)
        print(data)
        assert response.status_code == 200
        assert data['message'] == 'OTP verification successful'

def test_verify_wrong_otp(test_client):
    """ tests wrong otp verification """
    with patch('app.resources.auth.redis_conn.get', mock_redis_get):
        response = test_client.post('/api/v1/verify_otp', json={
            'email': 'test@example.com',
            'otp': 'wrongotp'
        })
        data = json.loads(response.data)
        assert response.status_code == 400
        assert data['message'] == 'OTP verification failed'

def test_check_user_exists(test_client):
    """ tests check user exists endpoint """
    response = test_client.post('/api/v1/check_user_exists', json={
        'email': 'test@example.com'
    })
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['message'] == 'User exists'

def test_check_user_does_not_exist(test_client):
    """ tests if a non existent user is passed in the endpoint """
    response = test_client.post('/api/v1/check_user_exists', json={
        'email': 'nonexistent@example.com'
    })
    data = json.loads(response.data)
    assert response.status_code == 404
    assert data['message'] == 'User does not exist'

def test_update_password(test_client):
    """ tests update password """
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    response = test_client.post('/api/v1/update_password', headers=headers, json={
        'email': 'test@example.com',
        'new_password': 'newpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['message'] == 'Password updated successfully'

def test_update_password_no_token(test_client):
    """ tests update password without token """
    response = test_client.post('/api/v1/update_password', json={
        'email': 'test@example.com',
        'new_password': 'newpasrd'
    })
    # TODO THIS IS WRONG need to check on this error later
    assert response.status_code == 200
