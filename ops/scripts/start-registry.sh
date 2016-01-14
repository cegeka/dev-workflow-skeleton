#!/bin/bash
REGISTRY_HOME="/var/opt/registry-dws"

if [ ! -d $REGISTRY_HOME ] 
then
	echo "Creating mount point for REGISTRY_HOME, password please..."
    sudo mkdir -p $REGISTRY_HOME
    sudo chown 1000 $REGISTRY_HOME
fi

docker build -t dws/registry ../registry/
docker rm -f dws_registry
docker run -d -p 8084:5000 \
		   -v $REGISTRY_HOME:/var/registry \
		   --name dws_registry dws/registry