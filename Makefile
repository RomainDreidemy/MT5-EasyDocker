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
