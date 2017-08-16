import os
from flask import Flask, request, render_template, jsonify, url_for, redirect, g, send_from_directory, session
from flask_sqlalchemy import SQLAlchemy
from .config import TestConfig, ASSETS_DIR, ROOT_DIR
from flask_bcrypt import Bcrypt


app = Flask(__name__, static_folder=ASSETS_DIR + '', template_folder=ASSETS_DIR)
app.config.from_object(TestConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


@app.route('/dist/<path:filepath>')
def dist_file(filepath):
    print('dist file at: ', filepath)
    return send_from_directory(os.path.join(ASSETS_DIR, 'dist'), filepath)


@app.route('/bower_components/<path:filepath>')
def bower_file(filepath):
    print('bower file at: ', filepath)
    return send_from_directory(os.path.join(ASSETS_DIR, 'bower_components'), filepath)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.server.auth.controllers import auth as auth_module

# Register blueprint(s)
app.register_blueprint(auth_module)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
print('creating database ...')
db.create_all()
