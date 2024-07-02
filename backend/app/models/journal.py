#!/usr/bin/env python3
""" Journal Model Schema """

from app import db
from datetime import datetime, timezone


class Journal(db.Model):
    """Class containing journal table schema"""
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50))
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False, index=True)

    def __repr__(self):
        return (f"<Journal id={self.id}, "
            f"title={self.title}, "
            f"category={self.category}, "
            f"date={self.date}>")

    def __str__(self):
        return str({
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'date': str(self.date),
            'user_id': self.user_id
        })

    def to_dict(self):
        """ returns the object in a dictionary """
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'date': self.date.isoformat(),
            'user_id': self.user_id,
        }
