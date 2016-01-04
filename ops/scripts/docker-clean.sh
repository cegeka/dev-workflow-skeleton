#!/bin/bash
docker rm -f $(docker ps -qa)
docker rmi -f $(docker images -qa)