import os


class BaseConfig(object):
    DEBUG = True
    # SQLALCHEMY_DATABASE_URL = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestConfig(object):
    """development configuration"""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URL = 'sqlite:///:memory:'
