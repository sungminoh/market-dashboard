# -*- coding: utf-8 -*-
import os

ASSETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../client')
ROOT_DIR = os.path.join(os.path.abspath(__file__))

class CommonConfig(object):
    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2
    # Secret key for signing cookies
    SECRET_KEY = "SESSION SECRET KEY"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class BaseConfig(CommonConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '')
    DATABASE_CONNECT_OPTIONS = {}


class TestConfig(CommonConfig):
    """development configuration"""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    DATABASE_CONNECT_OPTIONS = {}
