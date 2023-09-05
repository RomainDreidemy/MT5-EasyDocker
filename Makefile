DOCKER_COMPOSE=docker compose

up:
	$(DOCKER_COMPOSE) up --build --detach

down:
	$(DOCKER_COMPOSE) down --remove-orphans

install:
	$(DOCKER_COMPOSE) exec -it front yarn install --ignore-engines

build:
	$(DOCKER_COMPOSE) exec -it front yarn run build

watch:
	$(DOCKER_COMPOSE) exec -it front yarn run watch-build

logs:
	$(DOCKER_COMPOSE) logs -f

api-logs:
	$(DOCKER_COMPOSE) logs -f api

front-logs:
	$(DOCKER_COMPOSE) logs -f front

front-linter:
	$(DOCKER_COMPOSE) exec -it front yarn lint

database-logs:
	$(DOCKER_COMPOSE) logs -f database

api-sh:
	$(DOCKER_COMPOSE) exec -it api sh

front-sh:
	$(DOCKER_COMPOSE) exec -it front sh

database-sh:
	$(DOCKER_COMPOSE) exec -it database sh

api-test:
	$(DOCKER_COMPOSE) exec -it api go test -v ./...
