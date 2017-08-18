# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify, session
from sqlalchemy.exc import IntegrityError
from app.server.index import db, bcrypt
from app.server.petro.models import Price, Spread
from app.server.auth.utils import require_auth
from app.batch.petro.crawler import PetroCrawler


petro = Blueprint('petro', __name__, url_prefix='/api/petro')


@petro.route('/sync', methods=['POST', 'GET'])
def sync():
    # from ipdb import set_trace; set_trace()
    crawler = PetroCrawler()
    df = crawler.get_df()
    columns = df.columns.tolist()

    price_columns = list(filter(lambda col: not col.endswith('spread'), columns))
    price_date_col_dict = df[price_columns].T.to_dict()

    prices = (Price(date=date, **data) for date, data in price_date_col_dict.items() if date)
    price_query = Price.__table__.insert().prefix_with('IGNORE').values([price.to_dict() for price in prices])
    db.session.execute(price_query)

    spread_columns = list(filter(lambda col: col.endswith('spread'), columns))
    spread_df = df[spread_columns]
    spread_df.columns = [col.replace('_spread', '') for col in spread_columns]
    spread_date_col_dict = spread_df.T.to_dict()
    spreads = (Spread(date=date, **data) for date, data in spread_date_col_dict.items() if date)
    spread_query = Spread.__table__.insert().prefix_with('IGNORE').values([spread.to_dict() for spread in spreads])
    db.session.execute(spread_query)

    try:
        db.session.commit()
    except IntegrityError as e:
        from ipdb import set_trace; set_trace()
        return jsonify(success=False,
                       message='Fail to update petro database\n%r' % e), 500

    return jsonify(success=True)
