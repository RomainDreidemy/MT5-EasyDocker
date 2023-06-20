DOCKER_COMPOSE=docker compose

up:
	$(DOCKER_COMPOSE) up --build --detach

down:
	$(DOCKER_COMPOSE) down --remove-orphans

install:
	$(DOCKER_COMPOSE) exec -it react yarn install --ignore-engines

build:
	$(DOCKER_COMPOSE) exec -it react yarn run build

watch:
	$(DOCKER_COMPOSE) exec -it react yarn run watch-build

logs:
	$(DOCKER_COMPOSE) logs -f

api-logs:
	$(DOCKER_COMPOSE) logs -f api

front-logs:
	$(DOCKER_COMPOSE) logs -f front

database-logs:
	$(DOCKER_COMPOSE) logs -f database

api-sh:
	$(DOCKER_COMPOSE) exec -it api sh

front-sh:
	$(DOCKER_COMPOSE) exec -it front sh

database-sh:
	$(DOCKER_COMPOSE) exec -it database sh
