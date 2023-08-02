"""
reference site:
https://stackoverflow.com/questions/10664244/django-how-to-manage-development-and-production-settings
"""
from .settings import * 

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
