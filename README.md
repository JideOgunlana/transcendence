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

## Progress
:green_circle: Ready  
:orange_circle: Under construction  
:white_circle: Planned  

:green_circle: Use a Framework as backend. (2p)  
:white_circle: Use a front-end framework. (1p)  
:green_circle: Use a database for the backend. (1p)  
:white_circle: User management and authentication. (2p)  
:white_circle: Add another game. (2p)  
:white_circle: Game customization. (1p)  
:white_circle: Live chat. (2p)  
:white_circle: User and game stats dashboard. (1p)  
:white_circle: Infastructure setup for Log Management (2p).  
:white_circle: Monitoring system. (1p)  
:orange_circle: Designing the Backend as Microservices (2p)  
:white_circle: Use of advanced 3D techniques. (2p)  
:white_circle: Support on all devices. (1p)  
:white_circle: Expanding Browser Compatibility. (1p)  
:white_circle: Multiple language supports. (1p)  
:white_circle: Accessibility for Visually Impaired Users. (1p)  

:green_circle: 3p  
:white_circle: 18p  
:white_circle: 2p  

## Modules
A minimum of 7 major modules is required (14 points).  

- Web (6p)
- User Management (4p)
- Gameplay and user experience (9p)
- AI-Algo (3p)
- Cybersecurity (5p)
- Devops (5p)
- Graphics (2p)
- Accessibility (5p)
- Server-side pong (4p)

43 possible points.  

### Web
(2) Use a Framework as backend.  
(1) Use a front-end framework or toolkit.  
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
(2) AI opponent.  
(1) User and Game Stats Dashboards.  

### Cybersecurity
(2) Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management.  
(1) GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion.  
(2) Implement Two-Factor Authentication (2FA) and JWT.  

### Devops
(2) Infrastructure Setup for Log Management.  
(1) Monitoring system.  
(2) Designing the Backend as Microservices.  

### Graphics
(2) Use of advanced 3D techniques.

### Accessibility
(1) Support on all devices.  
(1) Expanding Browser Compatibility.  
(1) Multiple language supports.  
(1) Add accessiblity for Visually Impaired Users.  
(1) Server-Side Rendering (SSR) Integration.  

### Server-Side Pong
(2) Replacing Basic Pong with Server-Side Pong and Implementing an API.  
(2) Enabling Pong Gameplay via CLI against Web Users with API integration.  

## Setup
`python -m venv .venv`  
`source .venv/bin/activate`  

### Check if you're using the virtual environment.  
`which python`  
`pip install --upgrade pip && pip install -r requirements.txt`  

### Create the Django project and app
`django-admin startproject app`  
`cd app`  
`django-admin startapp core`  

