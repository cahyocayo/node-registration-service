FROM node:8-alpine as builder

RUN apk --no-cache add python make g++
COPY package*.json ./
RUN npm install


# The instructions for second stage
FROM node:8-alpine

# RUN apk add mysql-client busybox-extras curl net-tools
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules
COPY . .
CMD node starter.js
