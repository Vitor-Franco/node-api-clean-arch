# Objetivo: Empacotar todo projeto em um container

FROM node:19
WORKDIR /usr/src/clean-node-api 
COPY ./package*.json ./
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD ["npm", "start"]