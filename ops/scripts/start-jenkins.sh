#!/bin/bash
JENKINS_HOME="/var/opt/jenkins-dws"

if [ ! -d $JENKINS_HOME ] 
then
	echo "Creating mount point for JENKINS_HOME, password please..."
    sudo mkdir -p $JENKINS_HOME
    sudo chown 1000 $JENKINS_HOME
fi

docker network create -d bridge jenkins

docker build -t dws/jenkins ../jenkins/
docker rm -f dws_jenkins
docker run -d -p 8888:8888 \
		   --net jenkins \
		   -v $JENKINS_HOME:/var/jenkins_home \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   -v $(which docker):/bin/docker \
		   --name dws_jenkins dws/jenkins