# Overview

## Tools
- Django
- Postgres (Main database)
- PgAdmin (Database management)
- Nginx (Cache)
- Grafana/Prometheus (monitoring)
- Portainer (Container management)
- Elastic stack (Logging)

## Setup
`python -m venv .venv`  
`source .venv/bin/activate`  

## Check if you're using the virtual environment.  
`which python`  
`pip install --upgrade pip && pip install -r requirements.txt`  

## Create the Django project and app
`django-admin startproject app`  
`cd app`  
`django-admin startapp core`  