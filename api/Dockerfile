# api/Dockerfile

FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build  # Compiles TypeScript to JavaScript

# Production image
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --production

EXPOSE 3000
CMD ["node", "dist/main.js"]
