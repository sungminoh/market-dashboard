# -*- coding: utf-8 -*-
import requests


class PageNotFoundError(Exception):
    """Web Page is not Found."""


class Crawler(object):
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1;)'
    headers = {'User-Agent': user_agent, }

    def __init__(self):
        self.html = None

    def get_html(self, url):
        if self.html:
            return self.html
        response = requests.get(url, headers=self.headers)
        if response.status_code == 404:
            raise PageNotFoundError('Page Not found: %s', url)
        self.response = response
        self.html = self.response.text
        return self.html
