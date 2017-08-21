# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify, session, redirect
from sqlalchemy.exc import IntegrityError
from app.server.index import db, bcrypt
from app.server.auth.models import User
from app.server.auth.utils import generate_token, require_login, validate_email, generate_confirmation_token, confirm_token, require_confirmed
from app.server.auth.email import send_email


auth = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth.route('/signup', methods=['POST'])
def signup():
    params = request.get_json()

    email = params.get('email', '')
    password = bcrypt.generate_password_hash(params.get('password', ''))
    name = params.get('name', '')
    if not validate_email(email):
        return jsonify(success=False,
                       message='email is not valid'), 400

    user = User(email=email,
                password=password,
                name=name,
                admin=False,
                confirmed=False)

    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(success=False,
                       message='User with that email already exists'), 409

    send_confirm_email(user.email)

    return login(email, password)


@auth.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        return jsonify(success=False,
                       message='The confirmation link is invalid or has expired.'), 400
    user = User.query.filter_by(email=email).first_or_404()
    if user.confirmed:
        return redirect('http://localhost:3000/login')
        # return jsonify(success=True,
                       # message='Account alread confirmed. Please login.'), 400
    else:
        user.confirmed = True
        db.session.add(user)
        db.session.commit()
    return login(user.email, user.password)


@auth.route('/resend')
def send_confirm_email(email=''):
    # email = current_user.email or email
    token = generate_confirmation_token(email)
    html = 'localhost:5000/api/auth/confirm/%s' % token
    subject = 'Please confirm your email'
    send_email(email, subject, html)


@auth.route('/login', methods=['POST'])
def login(email='', password=''):
    params = request.get_json()

    if params:
        email = params.get('email', email)
        password = params.get('password', password)
    else:
        email = email
        password = password

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user'] = user.to_dict()
        token = generate_token(user)
        if not user.confirmed:
            send_confirm_email(user.email)
            return jsonify(success=True, token=token, isAuthed=False,
                           message='Account is not yet confirmed.'), 200
        return jsonify(success=True, isAuthed=True, token=token)
    else:
        return jsonify(success=False, redirect='/login', isAuthed=False,
                       message='User email or password is wrong'), 401


@auth.route('/session', methods=['POST'])
@require_login
@require_confirmed
def check_session():
    return jsonify(success=True)


@auth.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(success=True, redirect='/login')
