#!/bin/bash
JENKINS_HOME="/var/opt/jenkins-dws"

if [ ! -d $JENKINS_HOME ] 
then
    sudo mkdir -p $JENKINS_HOME
    sudo chown 1000 $JENKINS_HOME
fi

docker build -t dws_jenkins ../jenkins/
docker rm -f dws_jenkins
docker run -d -p 8888:8080 -v $JENKINS_HOME:/var/jenkins_home  --name dws_jenkins dws_jenkins