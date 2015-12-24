#!/bin/bash
docker rm -f dws-db
docker run -d -p 5432:5432 --net dws --name dws-db dws/db
