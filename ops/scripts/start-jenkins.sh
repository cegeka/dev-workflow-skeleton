#!/bin/bash

source build-maven.sh
	
JENKINS_HOME="/var/jenkins_home/"

if [ ! -d $JENKINS_HOME ] 
then
	echo "Need password to create $JENKINS_HOME as mount point for JENKINS_HOME"
    sudo mkdir -p $JENKINS_HOME
    sudo chown 1000 $JENKINS_HOME
fi

docker network create -d bridge dws-jenkins

docker build -t dws/jenkins ../jenkins/
docker rm -vf dws_jenkins
docker run -d -p 8888:8888 \
		   --net dws-jenkins \
		   -v $JENKINS_HOME:/var/jenkins_home \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   --name dws_jenkins dws/jenkins