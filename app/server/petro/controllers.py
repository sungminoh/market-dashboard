# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from app.server.index import db, logger
from app.server.petro.models import Price, Spread
from app.server.auth.utils import require_auth
from app.batch.petro.crawler import PetroCrawler
from app.server.petro.repository import get_daily, get_aggregated


petro = Blueprint('petro', __name__, url_prefix='/api/petro')


@petro.route('/sync', methods=['POST', 'GET'])
def sync():
    crawler = PetroCrawler()
    df = crawler.get_df()
    logger.info('CRAWL(%s): %s', crawler.date, crawler.file_path)
    columns = df.columns.tolist()

    price_columns = list(filter(lambda col: not col.endswith('spread'), columns))
    price_date_col_dict = df[price_columns].T.to_dict()

    prices = (Price(date=date, **data) for date, data in price_date_col_dict.items() if date)
    price_query = Price.__table__.insert().prefix_with('OR IGNORE').values([price.to_dict() for price in prices])
    db.session.execute(price_query)

    spread_columns = list(filter(lambda col: col.endswith('spread'), columns))
    spread_df = df[spread_columns]
    spread_df.columns = [col.replace('_spread', '') for col in spread_columns]
    spread_date_col_dict = spread_df.T.to_dict()
    spreads = (Spread(date=date, **data) for date, data in spread_date_col_dict.items() if date)
    spread_query = Spread.__table__.insert().prefix_with('OR IGNORE').values([spread.to_dict() for spread in spreads])
    db.session.execute(spread_query)

    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False,
                       message='Fail to update petro database\n%r' % e), 500

    return jsonify(success=True)


@petro.route('/chart-keys', methods=['GET'])
def keys():
    columns = Price.__table__.columns
    keys = [col.name for col in columns
            if not col.default and col.name not in {'id', 'date'}]
    return jsonify(success=True, data=keys)


@petro.route('/chart', methods=['GET'])
def chart():
    data_type = request.args.get('dataType')
    selected = list(filter(lambda x: x, request.args.get('selected', '').split(',')))
    if not data_type:
        return jsonify(success=False, message='Not enough params'), 400
    if data_type == 'daily':
        price_data = get_daily(Price)
        spread_data = get_daily(Spread)
        return jsonify(success=True,
                       data={'prices': price_data,
                             'spreads': spread_data})
    elif data_type == 'weekly':
        date_format = '%Y-%W'
        price_data = get_aggregated(Price, selected, date_format)
        spread_data = get_aggregated(Spread, selected, date_format)
        return jsonify(success=True,
                       data={'prices': price_data,
                             'spreads': spread_data})
    elif data_type == 'monthly':
        date_format = '%Y-%m'
        price_data = get_aggregated(Price, selected, date_format)
        spread_data = get_aggregated(Spread, selected, date_format)
        return jsonify(success=True,
                       data={'prices': price_data,
                             'spreads': spread_data})
