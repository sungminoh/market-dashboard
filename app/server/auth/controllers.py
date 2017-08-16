from flask import Blueprint, request, jsonify, session
from sqlalchemy.exc import IntegrityError
from app.server.index import db, bcrypt
from app.server.auth.models import User
from app.server.auth.utils import generate_token, require_auth

auth = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth.route('/signup', methods=['POST'])
def signup():
    params = request.get_json()

    email = params.get('email', '')
    password = bcrypt.generate_password_hash(params.get('password', ''))
    name = params.get('name', '')

    user = User(
        email=email,
        password=password,
        name=name
    )

    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='User with that email already exists'), 409

    return login(email, password)


@auth.route('/login', methods=['POST'])
def login(email='', password=''):
    params = request.get_json()

    email = params.get('email', email)
    password = params.get('password', password)

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id
        token = generate_token(user)
        response = jsonify(success=True, token=token)
        response.set_cookie('token', token)
        return response
    else:
        return jsonify(success=False, redirect='/login',
                       message="User email or password is wrong"), 401


@auth.route('/session', methods=['POST'])
@require_auth
def check_session():
    return jsonify(success=True)


@auth.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify(success=True, redirect='/login')
