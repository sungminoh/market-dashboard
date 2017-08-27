# -*- coding: utf-8 -*-
import re
from datetime import datetime, timedelta
import pandas as pd
from app.batch.crawler import Crawler, PageNotFoundError
from app.server.index import logger


class ExcelFileNotFound(PageNotFoundError):
    """Excel file which is requested is not found."""


class PetroCrawler(Crawler):
    page_url_formats = ['http://petrochemical.tistory.com/entry/KB-Chemical-Watch-%s',
                        'http://petrochemical.tistory.com/entry/KB-Chemical-Daily-%s']
    attachment_regex = r'''(http://[^>]*attachment[^>]*\.xl[^>]*)["']>'''

    def __init__(self):
        super().__init__()
        self.excel = None
        self.df = None
        self.file_path = None
        self.date = datetime.now().strftime('%m%d')

    def get_date(self, n):
        self.date = (datetime.now() - timedelta(days=n)).strftime('%m%d')
        return self.date

    def get_excel(self):
        if self.excel:
            return self.excel
        for i in range(10):
            for page_url_format in self.page_url_formats:
                try:
                    url = page_url_format % self.get_date(i)
                    html = self.get_html(url)
                    search = re.search(self.attachment_regex, html)
                    if search:
                        self.file_path = search.groups()[0]
                        self.excel = pd.ExcelFile(self.file_path, headers=self.headers)
                        return self.excel
                except PageNotFoundError:
                    logger.warning('Page not found --- %s', url)
                    pass
        raise ExcelFileNotFound('Excel file not found')

    @staticmethod
    def __reformat_columns(df):
        columns = df.columns
        remove_whitespaces = (' '.join(col.split()).replace(' ', '_') for col in columns)
        lower_case = (col.lower() for col in remove_whitespaces)
        spread_postfix = (col.replace('.1', '_spread') for col in lower_case)
        translate = ('cotton' if '면화' in col else
                     'rubber' if '고무' in col else
                     'refining_margin' if '정제' in col else
                     col for col in spread_postfix)
        columns = list(translate)
        columns[0] = 'date'
        df.columns = columns
        return df

    @staticmethod
    def __refind_unnecessaries(df):
        def is_english(s):
            try:
                s.encode(encoding='utf-8').decode('ascii')
            except UnicodeDecodeError:
                return False
            else:
                return True
        for col in df.columns:
            if col.startswith('unnamed') or not is_english(col):
                df.drop(col, axis=1, inplace=True)
        return df

    def get_df(self):
        if self.df:
            return self.df
        excel = self.get_excel()
        self.df = excel.parse(excel.sheet_names[-1], skiprows=2)
        self.__reformat_columns(self.df)
        self.__refind_unnecessaries(self.df)
        self.df = self.df.set_index('date')
        return self.df
