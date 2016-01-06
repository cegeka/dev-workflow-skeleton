#!/bin/bash

# Back-end
rm -r back-end/dws-jar
mkdir back-end/dws-jar
cp ../../dws/dws-rest/target/dws-rest-0.0.0-SNAPSHOT.jar back-end/dws-jar/dws-rest.jar

#Front-end
rm -r front-end/dws-dist
mkdir front-end/dws-dist
cp -r ../../dws/dws-ui/target/dist/* front-end/dws-dist/

docker-compose --x-networking --x-network-driver=bridge up -d
