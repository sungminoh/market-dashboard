from app.server.index import db


class Base(db.Model):
    __abstract__  = True
    id            = db.Column(db.Integer,   primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                            onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {col.name: getattr(self, col.name)
                for col in self.__table__.columns
                if not col.default}
