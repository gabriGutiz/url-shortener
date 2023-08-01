#!/bin/bash

sudo apt-get update && /
    apt-get upgrade /
    apt-get install git -y /
    apt-get install nginx -y /
    apt-get install docker.io -y

git clone https://$1:$2@github.com//gabriGutiz/layers-case.git

mv layers-case/api .
mv layers-case/site .

sudo docker build \
    --build-arg EKS_ENV=prd \
    --build-arg MONGO_CONN=$3 \
    --build-arg PORT=8000 \
    -t api ./api

sudo docker build -t site ./site

sudo docker run -d -p 8000:8000 api
sudo docker run -d -p 80001:80/tcp site

sudo mv -f layers-case/nginx.conf /etc/nginx/sites-avaiable/default

sudo systemctl restart nginx
nginx -t
