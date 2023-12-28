FROM node:18.16-slim AS base

# FROM --platform=amd64 node:18.16 AS base

WORKDIR /app

COPY . .

RUN npm ci && npm run build

CMD ["npm", "run", "start"]

####
FROM nginx:alpine AS nginx

ARG DOMAIN=localhost

RUN apk update --no-cache && apk add openssl --no-cache; \
    rm -Rf /var/cache/apk/*; \
    mkdir -p /etc/nginx/ssl/live/hleb365.ru; \
    openssl req -x509 -newkey rsa:2048 -sha256 -days 1 \ 
    -keyout /etc/nginx/ssl/live/hleb365.ru/privkey.pem \
    -out /etc/nginx/ssl/live/hleb365.ru/fullchain.pem \
    -nodes -subj "/C=RU/ST=State/L=City/O=hleb365/OU=IT Department/CN=$DOMAIN"
