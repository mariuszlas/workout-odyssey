docker compose -f docker-compose.yaml -f docker-compose.dev.yaml down --volumes --remove-orphans
docker volume prune --force
