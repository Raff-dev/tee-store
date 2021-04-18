#!/bin/sh

set -e

echo "Collecting static files"
python manage.py collectstatic --noinput

echo "Making migrations"
python manage.py makemigrations

echo "Applying migrations"
python manage.py migrate

echo "Running server"
gunicorn api.wsgi:application --bind 0.0.0.0:8000