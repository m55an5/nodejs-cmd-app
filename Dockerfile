FROM node:10-alpine

ENV path_to_txt_file=

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install 

COPY --chown=node:node . .

ENTRYPOINT ["/home/node/app/src/index.js","/testing.txt"]





