import urllib


def decode_url(obj):
    """decodes url encoded dictionary object"""
    for key, value in obj.items():
        if isinstance(value, dict):
            obj[key] = decode_url(value)
        else:
            obj[key] = value and urllib.parse.unquote(value) or ''
    return obj
