FROM node:20.2-alpine3.18 AS base

# FROM --platform=amd64 node:18.16 AS base

WORKDIR /app

COPY . .

RUN npm ci && npm run build

CMD ["npm", "run", "start"]