#!/usr/bin/env python3
""" Used to handle Journal operations """

from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.journal import Journal
from app.models.user import User


journal_parser = reqparse.RequestParser()
journal_parser.add_argument('title', type=str, required=True, help='Title cannot be blank')
journal_parser.add_argument('content', type=str, required=True, help='Content cannot be blank')
journal_parser.add_argument('category', type=str, required=True, help='Category cannot be blank')


class JournalListResource(Resource):
    """ Handles Journal Lists """
    @jwt_required()
    def get(self):
        """ gets all user journals in the db """
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found'}, 404

        journals = Journal.query.filter_by(user_id=user.id).all()
        return {'journals': [journal.to_dict() for journal in journals]}, 200

    @jwt_required()
    def post(self):
        """ adds a new journal in the database """
        args = journal_parser.parse_args()
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found'}, 404

        new_journal = Journal(
            title=args['title'],
            content=args['content'],
            category=args['category'],
            user_id=user.id
        )

        db.session.add(new_journal)
        db.session.commit()

        return new_journal.to_dict(), 201


class JournalResource(Resource):
    """ Handles an existing Journal get, update, delete operations """
    @jwt_required()
    def get(self, journal_id):
        """ Retirieve a journal by its id """
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found'}, 404

        journal = Journal.query.filter_by(id=journal_id, user_id=user.id).first()
        if journal is None:
            return {'message': 'Journal not found'}, 404
        return journal.to_dict(), 200

    @jwt_required()
    def put(self, journal_id):
        """ Updates a retireved journal """
        args = journal_parser.parse_args()
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found'}, 404

        journal = Journal.query.filter_by(id=journal_id, user_id=user.id).first()
        if journal is None:
            return {'message': 'Journal not found'}, 404

        journal.title = args['title']
        journal.content = args['content']
        journal.category = args['category']

        db.session.commit()
        return journal.to_dict(), 200

    @jwt_required()
    def delete(self, journal_id):
        """ Deletes an existing journal """
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {'message': 'User not found'}, 404

        journal = Journal.query.filter_by(id=journal_id, user_id=user.id).first()
        if journal is None:
            return {'message': 'Journal not found'}, 404

        db.session.delete(journal)
        db.session.commit()
        return {'message': 'Journal deleted'}, 200
