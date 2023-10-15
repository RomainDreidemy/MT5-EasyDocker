# EasyDocker

EasyDocker est une application qui permet de créer un fichier `docker-compose.yml` facilement via une interface graphique intuitive

## Developpement

Les commandes docker les plus importantes se trouve dans le fichier `Makefile`

### Lancer le projet

```shell
make up
# docker compose up --build --detach
```

### Arrêter les container

```shell
make down
# docker compose down --remove-orphans
```

### Installer les dépendances Front

```shell
make install
# docker compose exec -it front yarn install --ignore-engines
```

### Build le Front

```shell
make build
# docker compose exec -it front yarn run build
```

### Lancer le Front en mode watch

```shell
make watch
# docker compose exec -it front yarn run watch-build
```

### Voir les logs

```shell
make logs:
# docker compose logs -f
```

### Logs de l'API

```shell
make api-logs 
# docker compose logs -f api
```

### Logs du Front

```shell
make front-logs
# docker compose logs -f front
```

### Lint du Front

```shell
make front-linter
# docker compose exec -it front yarn lint
```

### Logs de la base de donnée

```shell
make database-logs
# docker compose logs -f database
```

### Ouvrir un terminal bash dans le container de l'API

```shell
make api-sh
# docker compose exec -it api sh
```

### Ouvrir un terminal bash dans le container du Front

```shell
make front-sh
# docker compose exec -it front sh
```

### Ouvrir un terminal bash dans le container de la base de donnée

```shell
make database-sh
# docker compose exec -it database sh
```

### Lancer les tests de l'API

```shell
make api-test
# docker compose exec -it api go test -v ./...
```
