#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Matthew Ford'
SITENAME = u'bicyclewheel.info'
SITEURL = 'http://localhost:8000'

PATH = 'content'
OUTPUT_PATH = 'output/'

TIMEZONE = 'America/Chicago'
DEFAULT_LANG = u'English'

THEME = 'simple'

OPEN_GRAPH_IMAGE = 'images/bicyclewheelinfo_screenshot.png'

SOCIAL_NAV = (('', 'https://github.com/bicyclewheel/bicyclewheel.github.io', 'fab fa-github-square'),)

# Page and article URLs
ARTICLE_URL = 'articles/{slug}/'
ARTICLE_SAVE_AS = 'articles/{slug}/index.html'

PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Nav menu items
# MENUITEMS = [('The App', '/app.html')]
MENUITEMS = []

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = False

PLUGIN_PATHS = ['../../pelican-plugins']
PLUGINS = ['pelican_javascript', 'render_math']

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.toc': {},
    },
    'output_format': 'html5',
}

# Include CNAME file in output for Github Pages
STATIC_PATHS = ['images', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}
