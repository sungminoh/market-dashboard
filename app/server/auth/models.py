# -*- coding: utf-8 -*-
from app.server.index import db
from app.server.common.models import Base


class User(Base):
    __tablename__ = 'users'

    email    = db.Column(db.String(128),  nullable=False,  unique=True)
    password = db.Column(db.String(192),  nullable=False)
    name     = db.Column(db.String(128),  nullable=False)

    def __init__(self, email, password, name):
        super().__init__()
        self.email      = email
        self.password   = password
        self.name       = name

    def __repr__(self):
        return '<User %r, %r>' % (self.name, self.email)
