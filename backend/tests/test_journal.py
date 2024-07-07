""" tests Journal Endpoints """
import json
import os
import sys
from unittest.mock import patch
import pytest

# LOCAL IMPORTS
# Add the root directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')
# disabled pylint to enable local imports
# pylint: disable=wrong-import-position
from app import create_app, db
from app.models.user import User
from app.models.journal import Journal

# disabled this pylint for naming consistency
# pylint: disable=redefined-outer-name
# disabled since some are needed
# pylint: disable=unused-argument

# Helper function to get a valid token
def get_valid_token(test_client, email='test@example.com', password='password'):
    """ mocks function used to get valid token from the store """
    response = test_client.post('/api/v2/login', json={
        'email': email,
        'password': password
    })
    data = json.loads(response.data)
    return data.get('access_token')

@pytest.fixture
def test_client():
    """ Sets up the Flask test client and initialize the database for testing."""
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            yield client
            db.session.remove()

@pytest.fixture
def mock_jwt_required():
    """ Mocks the JWT required decorator to bypass authentication for testing purposes. """
    with patch('flask_jwt_extended.view_decorators.jwt_required', lambda x: x):
        yield

@pytest.fixture
def mock_get_jwt_identity():
    """ Mocks the JWT identity retrieval to always return test@example.com"""
    with patch(
                'flask_jwt_extended.utils.get_jwt_identity',
                return_value='test@example.com'
                ):
        yield

@pytest.fixture
def setup_user():
    """ Setup and teardown for creating and deleting a test user """
    user = User(email='test@example.com', username='username')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    yield user

    db.session.delete(user)
    db.session.commit()

@pytest.fixture
def setup_journals(setup_user):
    """ Setup and teardown for creating and deleting test journals """
    journals = [
        Journal(
            title='Title 1',
            content='Content 1',
            category='Category 1',
            user_id=setup_user.id
        ),
        Journal(
            title='Title 2',
            content='Content 2',
            category='Category 2',
            user_id=setup_user.id
        ),
    ]
    db.session.add_all(journals)
    db.session.commit()

    yield journals

    for journal in journals:
        db.session.delete(journal)
    db.session.commit()

def test_get_journals(test_client,
                      mock_jwt_required,
                      mock_get_jwt_identity,
                      setup_user,
                      setup_journals
                      ):
    """ Tests retrieving all journals for the authenticated user. """
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    response = test_client.get('/api/v2/journals', headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data['journals']) == 2

def test_create_journal(test_client, mock_jwt_required, mock_get_jwt_identity, setup_user):
    """ Tests creating a new journal for the authenticated user. """
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    response = test_client.post('/api/v2/journals', json={
        'title': 'New Journal',
        'content': 'New Content',
        'category': 'New Category'
    }, headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 201
    assert data['title'] == 'New Journal'
    assert data['content'] == 'New Content'
    assert data['category'] == 'New Category'

    # Clean up the created journal
    journal = Journal.query.filter_by(title='New Journal').first()
    db.session.delete(journal)
    db.session.commit()

def test_get_journal(test_client,
                     mock_jwt_required,
                     mock_get_jwt_identity,
                     setup_user,
                     setup_journals
                     ):
    """ Tests retrieving a specific journal by its ID. """
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    journal_id = setup_journals[0].id
    response = test_client.get(f'/api/v2/journals/{journal_id}', headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['title'] == 'Title 1'

def test_update_journal(test_client,
                        mock_jwt_required,
                        mock_get_jwt_identity,
                        setup_user,
                        setup_journals
                        ):
    """ Tests updating an existing journal's details."""
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    journal_id = setup_journals[0].id
    response = test_client.put(f'/api/v2/journals/{journal_id}', json={
        'title': 'Updated Title',
        'content': 'Updated Content',
        'category': 'Updated Category'
    }, headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['title'] == 'Updated Title'
    assert data['content'] == 'Updated Content'
    assert data['category'] == 'Updated Category'

def test_delete_journal(test_client,
                        mock_jwt_required,
                        mock_get_jwt_identity,
                        setup_user,
                        setup_journals
                        ):
    """ Tests deleting an existing journal by its ID. """
    token = get_valid_token(test_client)
    headers = {'set-cookie': f'access_token={token}'}
    journal_id = setup_journals[0].id
    response = test_client.delete(f'/api/v2/journals/{journal_id}', headers=headers)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['message'] == 'Journal deleted'
