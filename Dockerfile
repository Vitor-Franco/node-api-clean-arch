# Objetivo: Empacotar todo projeto em um container

FROM node:12
WORKDIR /usr/src/clean-node-api 
COPY ./package*.json ./
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 3333
CMD ["npm", "start"]