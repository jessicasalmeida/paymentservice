FROM node:alpine

RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

ENV DB_CONN_STRING="mongodb://root:MongoDB2019!@mongo:27017/"
ENV DB_NAME="restaurante_db"
ENV CART_COLLECTION_NAME="cart"
ENV ORDER_COLLECTION_NAME="order"
ENV PRODUCT_COLLECTION_NAME="produtos"
ENV USER_COLLECTION_NAME="user"

COPY ./dist/ /usr/src/app/dist
COPY .env /usr/src/app

EXPOSE 8000

CMD ["npm", "start"]
