Use settings.py for production. In the same directory create settings_dev.py for overrides.

```python3
# settings_dev.py
from .settings import * 

DEBUG = True
```

On a dev machine run your Django app with:

``` bash
DJANGO_SETTINGS_MODULE=recommender.settings_dev python3 manage.py runserver
```
On a prod machine run as if you just had settings.py and nothing else.

### ADVANTAGES

- settings.py (used for production) is completely agnostic to the fact that any other environments even exist.

- To see the difference between prod and dev you just look into a single location - settings_dev.py. No need to gather configurations scattered across settings_prod.py, settings_dev.py and settings_shared.py.

- If someone adds a setting to your prod config after troubleshooting a production issue you can rest assured that it will appear in your dev config as well (unless explicitly overridden). Thus the divergence between different config files will be minimized.
