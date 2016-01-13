source /docker-entrypoint.sh postgres
flyway clean
flyway migrate