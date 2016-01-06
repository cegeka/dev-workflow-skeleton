#!/bin/bash
docker rm -vf $(docker ps -qa)
docker rmi -f $(docker images -qa)