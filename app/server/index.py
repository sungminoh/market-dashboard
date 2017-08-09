import os
from flask import Flask, request, render_template, jsonify, url_for, redirect, g, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from .config import BaseConfig
# from flask_bcrypt import Bcrypt


ASSETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../client')

app = Flask(__name__, static_folder=ASSETS_DIR + '', template_folder=ASSETS_DIR)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)


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
