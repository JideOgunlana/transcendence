# Overview

## Getting started
Use `.env-example` to create a valid `.env` file. Start the setup with `make` in the base directory.  

Go to `http://localhost:8000` in your favorite browser.  
Go to `http://localhost:5050` for PgAdmin.  
Go to `http://localhost:9443` for Portainer.  

## Services
- Django (Backend)
- React (Frontend)
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

## Modules
- Web
- User Management
- Gameplay and user experience
- AI-Algo
- Cybersecurity
- Devops
- Graphics
- Accessibility
- Server-side pong