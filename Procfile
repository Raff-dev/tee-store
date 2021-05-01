release: python backend/manage.py makemigrations
release: python backend/manage.py migrate

web: cd backend && gunicorn api.wsgi