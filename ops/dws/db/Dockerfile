FROM postgres:9.4.5

ENV POSTGRES_USER=postgres POSTGRES_PASSWORD=secret POSTGRES_DB=dws

COPY init.sh /docker-entrypoint-initdb.d/
