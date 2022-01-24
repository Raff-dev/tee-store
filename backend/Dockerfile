FROM python:3.8

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY . .

RUN set -ex \
    && pip install --upgrade pip \
    && pip install pipenv \
    && pip install -r requirements.txt \
    && apt-get -y update \
    && apt-get install -y wkhtmltopdf

EXPOSE 8000
