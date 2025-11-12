#!/bin/bash
# Dockerfile pour le Front (React)
# image de base : node
FROM node:25-slim AS builder_f

# install Midnight Commander + vim 
RUN apt-get update && apt-get install -y --no-install-recommends xz-utils man-db mc mcedit vim apt-utils
# nettoyage apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# mcedit en default editor + Appearance skin : Gotar
RUN mkdir /root/.config; mkdir /root/.config/mc
COPY ./share/ini /root/.config/mc/ini

# personnalisation shell bash root
COPY ./share/bashrc /root/.bashrc

WORKDIR /app

COPY package*.json .
# install des dépendances de prod
RUN npm i --omit=dev

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
EXPOSE 5173
# check si le serveur répond
HEALTHCHECK --interval=45s --timeout=55s CMD curl -f http://localhost:5173 || exit 1
