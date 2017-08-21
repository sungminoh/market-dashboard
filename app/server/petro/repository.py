from app.server.petro.models import Price, Spread
from app.server.index import db
from sqlalchemy.sql.expression import func


def results_to_dict(results):
    return [{key: getattr(result, key) for key in result.keys()} for result in results]


def get_daily(table, selected=None):
    if selected:
        columns = [getattr(table, col) for col in selected if hasattr(table, col)]
        results = db.session.query(func.strftime('%Y-%m-%d', table.date).label('date'),
                                   *columns).all()
        return results_to_dict(results)
    return [result.to_dict() for result in table.query.order_by('date').all()]


def get_aggregated(table, selected, date_format):
    ret = {}
    for col in selected:
        if not hasattr(table, col):
            continue
        high_low = db.session.query(func.strftime(date_format, table.date).label('date'),
                                    func.max(getattr(table, col)).label('high'),
                                    func.min(getattr(table, col)).label('low')).\
            group_by(func.strftime(date_format, table.date)).subquery()
        min_date = db.session.query(table.id, func.min(table.date)).\
            group_by(func.strftime(date_format, table.date)).subquery()
        open_price = db.session.query(func.strftime(date_format, table.date).label('date'),
                                        getattr(table, col).label('open')).\
            join(min_date, table.id==min_date.c.id).subquery()
        max_date = db.session.query(table.id, func.max(table.date)).\
            group_by(func.strftime(date_format, table.date)).subquery()
        close_price = db.session.query(func.strftime(date_format, table.date).label('date'),
                                        getattr(table, col).label('close')).\
            join(max_date, table.id==max_date.c.id).subquery()
        data = db.session.query(high_low.c.date.label('date'),
                                high_low.c.high.label('high'),
                                high_low.c.low.label('low'),
                                open_price.c.open.label('open'),
                                close_price.c.close.label('close')).\
            select_from(high_low).\
            join(open_price, open_price.c.date==high_low.c.date).\
            join(close_price, close_price.c.date==high_low.c.date).order_by('date').all()
        ret[col] = results_to_dict(data)
    return ret
