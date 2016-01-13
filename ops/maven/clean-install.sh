#!/bin/bash

docker network create -d bridge dws-maven

docker build -t dws/db ../dws/db/
docker rm -vf dws_db_maven
docker run -d --net dws-maven --name dws_db_maven dws/db

docker rm -vf dws_maven_clean_install
docker run -it --net dws-maven --name dws_maven_clean_install -v $(pwd)/../../dws:/usr/src/dws -w /usr/src/dws maven:3.3-jdk-8 mvn clean install -B -Ddb.host=dws_db_maven -pl '!:dws-acc-tests' | grep -v 'Download.*: http'

docker stop dws_maven_clean_install
docker rm -v dws_maven_clean_install
docker stop dws_db_maven
docker rm -v dws_db_maven
docker network rm dws-maven