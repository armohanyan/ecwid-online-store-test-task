# Stage 1: Build frontend
FROM node:22-alpine AS client

WORKDIR /client

COPY client/package.json client/yarn.lock ./
RUN yarn install

COPY client .
RUN yarn build


# Stage 2: Build backend
FROM node:22-alpine AS build

WORKDIR /app

COPY api/package.json api/yarn.lock ./
RUN yarn install

COPY api .
RUN yarn build


# Final stage: production image
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

COPY --from=client /client/dist ./public

RUN yarn install    # install all dependencies (including dev if needed)

EXPOSE 3000

CMD ["yarn", "start"]
