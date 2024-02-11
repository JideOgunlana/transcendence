NAME=transcendence

up:
	docker-compose up --build

prod:
	docker-compose -f docker-compose.prod.yml up -d --build

superuser:
	docker-compose exec app python manage.py createsuperuser

django:
	python cs50/manage.py runserver 0.0.0.0:8000

migrate:
	docker-compose exec app python manage.py migrate --noinput

create_user:
	docker-compose exec db psql -U postgres -c "CREATE USER hello_django WITH PASSWORD 'hello_django123';"

clean:
	docker-compose down

fclean:
	docker-compose down -v
	docker system prune -af

.PHONY: up prod superuser down downv django migrate create_user clean fclean