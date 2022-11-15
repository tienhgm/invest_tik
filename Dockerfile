FROM node:14-alpine

WORKDIR /app/frontend

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . /app/frontend/
EXPOSE 3000
