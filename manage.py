# -*- coding: utf-8 -*-
from flask_script import Manager
from app.server.index import app, db
from app.server.auth.models import User

manager = Manager(app)


@manager.command
def create_db():
    print('creating database ...')


@manager.command
def create_admin():
    db.session.add(User(
        email='<ADMIN EMAIL ADDRESS>',
        password='<ADMIN PASSWORD>',
        admin=True,
        confirmed=True
    ))
    db.session.commit()


if __name__ == '__main__':
    manager.run()
