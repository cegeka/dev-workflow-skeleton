#!/bin/bash
docker rm -f dws-db
docker run -d -p 5432:5432 --name dws-db dws/db
