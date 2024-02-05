NAME=transcendence

up:
	docker-compose up --build

prod:
	docker-compose -f docker-compose.prod.yml up -d --build

superuser:
	docker-compose exec web python manage.py createsuperuser

down:
	docker-compose down

django:
	python cs50/manage.py runserver 0.0.0.0:8000

migrate:
	docker-compose exec web python manage.py migrate --noinput

create_user:
	docker-compose exec db psql -U postgres -c "CREATE USER hello_django WITH PASSWORD 'your_password';"


prune:
	docker system prune -af
