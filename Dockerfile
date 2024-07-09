FROM node:alpine

RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

ENV DB_CONN_STRING="mongodb://root:MongoDB2019!@mongo:27017/"
ENV DB_NAME="restaurante_db"
ENV ORDER_COLLECTION_NAME="order"
ENV URL="http://localhost:8000"

COPY ./dist/ /usr/src/app/dist
COPY .env /usr/src/app

EXPOSE 5000

CMD ["npm", "start"]
