#!/bin/bash
docker rm -f dws-back-end
docker run -d -p 8080:8080 --name dws-back-end dws/back-end
