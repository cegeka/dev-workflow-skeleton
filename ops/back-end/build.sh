#!/bin/bash

rm -r dws-jar
mkdir dws-jar
cp ../../dws/dws-rest/target/dws-rest-0.0.0-SNAPSHOT.jar dws-jar/dws-rest.jar

docker build -t dws/back-end .