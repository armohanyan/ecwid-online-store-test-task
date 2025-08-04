# client/Dockerfile

FROM node:22-alpine AS client

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build
