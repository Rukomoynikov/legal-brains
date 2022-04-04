FROM node:lts-alpine
RUN apk add g++ make python3
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci