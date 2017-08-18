# -*- coding: utf-8 -*-
from functools import wraps
from flask import request, jsonify, session
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from app.server.index import app

TWO_WEEKS = 1209600


def generate_token(user, expiration=TWO_WEEKS):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'user_id': user.id,
    }).decode('utf-8')
    return token


def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.get_json().get('token', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            info = verify_token(string_token)
            if info and session['user_id'] == info['user_id']:
                return f(*args, **kwargs)
        return jsonify(message="Authentication is required to access this resource"), 401

    return decorated
