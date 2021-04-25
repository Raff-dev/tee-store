FROM python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY . .

RUN set -ex \
    && pip install --upgrade pip \
    && pip install pipenv \
    && pipenv install --skip-lock --system --dev

EXPOSE 8000
