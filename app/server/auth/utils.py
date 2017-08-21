# -*- coding: utf-8 -*-
import re
from functools import wraps
from flask import request, jsonify, session
from itsdangerous import TimedJSONWebSignatureSerializer as WebSerializer,\
    URLSafeTimedSerializer as UrlSerializer
from itsdangerous import SignatureExpired, BadSignature
from app.server.index import app
from app.server.auth.models import User

TWO_WEEKS = 1209600
TWO_HOURS = 3600


class AuthException(Exception):
    pass


def generate_token(user, expiration=TWO_WEEKS):
    s = WebSerializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'user_id': user.id,
    }).decode('utf-8')
    return token


def verify_token(token):
    s = WebSerializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def require_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.get_json().get('token', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            info = verify_token(string_token)
            if info and session.get('user', {}).get('id', -1)  == info.get('user_id', None):
                return f(*args, **kwargs)
        return jsonify(success=False,
                       message="Authentication is required to access this resource"), 401

    return decorated


def validate_email(email):
    match = re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$',
                     email)
    if match:
        return True
    return False


def generate_confirmation_token(email):
    serializer = UrlSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=TWO_HOURS):
    serializer = UrlSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

def require_confirmed(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get('user', {}).get('confirmed', False):
            return f(*args, **kwargs)
        return jsonify(success=False,
                       message='Please confirm your account.'), 401

    return decorated
