FROM node:20.2-alpine3.18 AS base

# FROM --platform=amd64 node:18.16 AS base

WORKDIR /app

COPY . .

RUN apk add --no-cache --update python3 make g++ libc6-compat

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm cache clean --force && npm ci

CMD ["npm", "run", "start"]