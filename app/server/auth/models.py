# import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app.server.index import db

# Define a base model for other database tables to inherit
class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer,   primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                            onupdate=db.func.current_timestamp())

# Define a User model
class User(Base):
    __tablename__ = 'users'

    # Identification Data: email & password
    email    = db.Column(db.String(128),  nullable=False, unique=True)
    password = db.Column(db.String(192),  nullable=False)
    name     = db.Column(db.String(128),  nullable=False)

    # New instance instantiation procedure
    def __init__(self, email, password, name):
        self.email    = email
        self.password = password
        self.name = name

    def __repr__(self):
        return '<User %r, %r>' % (self.name, self.email)
