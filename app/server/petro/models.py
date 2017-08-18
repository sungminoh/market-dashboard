# -*- coding: utf-8 -*-
from app.server.index import db
from app.server.common.models import Base
from app.server.common.utils import safe_execute


class Price(Base):
    __tablename__ = 'petro_price'

    date           = db.Column(db.DateTime,      nullable=False,  unique=True)
    dubai          = db.Column(db.Float(10, 2),  nullable=True)
    wti            = db.Column(db.Float(10, 2),  nullable=True)
    complex_margin = db.Column(db.Float(10, 2),  nullable=True)
    naphtha        = db.Column(db.Float(10, 2),  nullable=True)
    ethylene       = db.Column(db.Float(10, 2),  nullable=True)
    propylene      = db.Column(db.Float(10, 2),  nullable=True)
    butadiene      = db.Column(db.Float(10, 2),  nullable=True)
    benzene        = db.Column(db.Float(10, 2),  nullable=True)
    toluene        = db.Column(db.Float(10, 2),  nullable=True)
    px             = db.Column(db.Float(10, 2),  nullable=True)
    sm             = db.Column(db.Float(10, 2),  nullable=True)
    pta            = db.Column(db.Float(10, 2),  nullable=True)
    meg            = db.Column(db.Float(10, 2),  nullable=True)
    ldpe           = db.Column(db.Float(10, 2),  nullable=True)
    lldpe          = db.Column(db.Float(10, 2),  nullable=True)
    hdpe           = db.Column(db.Float(10, 2),  nullable=True)
    pp             = db.Column(db.Float(10, 2),  nullable=True)
    cotton         = db.Column(db.Float(10, 2),  nullable=True)
    rubber         = db.Column(db.Float(10, 2),  nullable=True)

    def __init__(self, date, dubai, wti, complex_margin, naphtha, ethylene,
                 propylene, butadiene, benzene, toluene, px, sm, pta,
                 meg, ldpe, lldpe, hdpe, pp, cotton, rubber):
        super().__init__()
        self.date           = date
        self.dubai          = safe_execute(float, dubai)
        self.wti            = safe_execute(float, wti)
        self.complex_margin = safe_execute(float, complex_margin)
        self.naphtha        = safe_execute(float, naphtha)
        self.ethylene       = safe_execute(float, ethylene)
        self.propylene      = safe_execute(float, propylene)
        self.butadiene      = safe_execute(float, butadiene)
        self.benzene        = safe_execute(float, benzene)
        self.toluene        = safe_execute(float, toluene)
        self.px             = safe_execute(float, px)
        self.sm             = safe_execute(float, sm)
        self.pta            = safe_execute(float, pta)
        self.meg            = safe_execute(float, meg)
        self.ldpe           = safe_execute(float, ldpe)
        self.lldpe          = safe_execute(float, lldpe)
        self.hdpe           = safe_execute(float, hdpe)
        self.pp             = safe_execute(float, pp)
        self.cotton         = safe_execute(float, cotton)
        self.rubber         = safe_execute(float, rubber)

    def __repr__(self):
        return '<Price %r>' % (self.date)


class Spread(Base):
    __tablename__ = 'petro_spread'

    date            = db.Column(db.DateTime,      nullable=False,  unique=True)
    ethylene        = db.Column(db.Float(10, 2),  nullable=True)
    propylene       = db.Column(db.Float(10, 2),  nullable=True)
    benzene         = db.Column(db.Float(10, 2),  nullable=True)
    toluene         = db.Column(db.Float(10, 2),  nullable=True)
    px              = db.Column(db.Float(10, 2),  nullable=True)
    sm              = db.Column(db.Float(10, 2),  nullable=True)
    pta             = db.Column(db.Float(10, 2),  nullable=True)
    meg             = db.Column(db.Float(10, 2),  nullable=True)
    ldpe            = db.Column(db.Float(10, 2),  nullable=True)
    lldpe           = db.Column(db.Float(10, 2),  nullable=True)
    hdpe            = db.Column(db.Float(10, 2),  nullable=True)
    pp              = db.Column(db.Float(10, 2),  nullable=True)

    def __init__(self, date, ethylene, propylene, benzene, toluene, px, sm, pta, meg,
                 ldpe, lldpe, hdpe, pp):
        super().__init__()
        self.date       = date
        self.ethylene   = safe_execute(float, ethylene)
        self.propylene  = safe_execute(float, propylene)
        self.benzene    = safe_execute(float, benzene)
        self.toluene    = safe_execute(float, toluene)
        self.px         = safe_execute(float, px)
        self.sm         = safe_execute(float, sm)
        self.pta        = safe_execute(float, pta)
        self.meg        = safe_execute(float, meg)
        self.ldpe       = safe_execute(float, ldpe)
        self.lldpe      = safe_execute(float, lldpe)
        self.hdpe       = safe_execute(float, hdpe)
        self.pp         = safe_execute(float, pp)

    def __repr__(self):
        return '<Spread %r>' % (self.date)
