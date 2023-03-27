up:
	docker compose up --build --detach

down:
	docker compose down --remove-orphans

install:
	docker compose exec -it react yarn install --ignore-engines

build:
	docker compose exec -it react yarn run build

watch:
	docker compose exec -it react yarn run watch-build

logs:
	docker compose logs -f

api-logs:
	docker compose logs -f api

front-logs:
	docker compose logs -f front

database-logs:
	docker compose logs -f database

api-sh:
	docker compose exec -it api sh

front-sh:
	docker compose exec -it front sh

database-sh:
	docker compose exec -it database sh
