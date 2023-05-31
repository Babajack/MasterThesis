FROM node:current as base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
RUN apt-get update && apt-get -y install docker.io

FROM base as production
ENV NODE_PATH=./build
RUN npm run build