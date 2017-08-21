from flask.ext.mail import Message
from app.server.index import app, mail


def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    print('email has been sent to %s\ncontent: %s' % (to, template))
    mail.send(msg)
