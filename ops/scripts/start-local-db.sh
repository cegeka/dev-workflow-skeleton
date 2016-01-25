#!/bin/bash
docker build -t dws/db ../dws/db/clean/
docker rm -vf dws_db_local
docker run -d -p 5432:5432 --name dws_db_local dws/db