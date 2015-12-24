#!/bin/bash

rm -r dws-dist
mkdir dws-dist
cp -r ../../dws/dws-ui/target/dist/* dws-dist

docker build -t dws/front-end .