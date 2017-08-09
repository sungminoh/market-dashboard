from flask_script import Manager


from app.server.index import app


manager = Manager(app)


@manager.command
def create_db():
    print('creating database ...')


if __name__ == '__main__':
    manager.run()
