#!/bin/bash
docker build -t dws_jenkins ../jenkins/
docker rm -f dws_jenkins
docker run -d -p 8888:8080 --name dws_jenkins dws_jenkins