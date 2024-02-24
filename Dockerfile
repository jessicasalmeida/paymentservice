FROM node:alpine

RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

ENV DB_CONN_STRING="uri"
ENV DB_NAME="db"
ENV CART_COLLECTION_NAME="collection"
ENV ORDER_COLLECTION_NAME="collection"
ENV PRODUCT_COLLECTION_NAME="collection"
ENV USER_COLLECTION_NAME="collection"

COPY ./dist/ /usr/src/app/dist
COPY .env /usr/src/app

EXPOSE 8000

CMD ["npm", "start"]
