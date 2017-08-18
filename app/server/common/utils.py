def safe_execute(func, *args, **kwargs):
    try:
        return func(*args, **kwargs)
    except:
        return None
