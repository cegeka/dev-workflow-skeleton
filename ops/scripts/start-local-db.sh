#!/bin/bash
docker build -t dws_db ../dws/db/
docker rm -f dws_db_local
docker run -d -p 5432:5432 --name dws_db_local dws_db