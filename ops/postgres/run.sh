#!/bin/bash
docker rm -f postgres
docker run -d -p 5432:5432 --name postgres dws/postgres
