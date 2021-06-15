#!/usr/bin/env bash
docker run -p 3300:3000 -v $PWD:/opt/tinyweb -it node:14-alpine3.12 sh -c "cd /opt/tinyweb;yarn start"

