# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, send_from_directory
from .config import TestConfig as config, ASSETS_DIR
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask.ext.mail import Mail
import logging
from logging.handlers import RotatingFileHandler


app = Flask(__name__, static_folder=ASSETS_DIR + '', template_folder=ASSETS_DIR)
app.config.from_object(config)
bcrypt = Bcrypt(app)
handler = RotatingFileHandler('flask.log', maxBytes=100000, backupCount=1)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)
logger = app.logger


db = SQLAlchemy(app)
mail = Mail(app)


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


@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return send_from_directory(os.path.join(ASSETS_DIR, 'src'), 'favicon.ico')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.server.auth.controllers import auth
from app.server.petro.controllers import petro

# Register blueprint(s)
app.register_blueprint(auth)
app.register_blueprint(petro)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
print('creating database ...')
db.create_all()
