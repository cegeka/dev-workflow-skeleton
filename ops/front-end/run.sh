#!/bin/bash
docker rm -f dws-front-end
docker run -d -p 80:80 --net dws --name dws-front-end dws/front-end
