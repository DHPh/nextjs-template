#!/bin/bash

name="nextjs_template"
image="dangph/nextjs_template"

docker stop ${name}
docker rm ${name}

docker run -d \
    --restart always \
    -p 30000:3000 \
    --env-file ./.env.local \
    --name ${name} \
    ${image}
