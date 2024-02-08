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
A minimum of 7 major modules is required (14 points).  

- Web (6)
- User Management (4)
- Gameplay and user experience (9)
- AI-Algo (3)
- Cybersecurity (5)
- Devops (5)
- Graphics (2)
- Accessibility (5)
- Server-side pong (4)

43 possible points.  

### Web
(2) Use a Framework as backend.  
(1) Use a front-end famework or toolkit.  
(1) Use a database for the backend.
(2) Store the score of a tournament in the Blockchain.

### User Management
(2) Standard user management, authentication, users across tournaments.  
(2) Implementing a remote authentication.

### Gameplay and user experience
(2) Remote players.  
(2) Multiplayers (more than 2 in the same game).  
(2) Add another game.
(1) Game customization options.  
(2) Live chat.  

### AI-Algo
(2)