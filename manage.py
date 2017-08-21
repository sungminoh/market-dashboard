# -*- coding: utf-8 -*-
import argparse
from flask_script import Manager
from app.server.index import app, db, bcrypt
from app.server.auth.models import User

manager = Manager(app)


@manager.command
def create_db():
    print('creating database ...')


@manager.command
def create_admin():
    password = bcrypt.generate_password_hash('<ADMIN PASSWORD>')
    db.session.add(User(
        email='<ADMIN EMAIL ADDRESS>',
        password=password,
        name='<ADMIN NAME>',
        admin=True,
        confirmed=True
    ))
    db.session.commit()


if __name__ == '__main__':
    manager.run()
