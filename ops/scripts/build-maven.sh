#!/bin/bash
docker build -t dws/mvn ../maven/base/
docker build -t dws/mvn-front-end ../maven/front-end/
docker build -t dws/mvn-e2e ../maven/e2e/