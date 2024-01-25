import express from "express";
import { userController } from "./user-controller";
import { userRepositoryMongoBd } from "../driven/infra/user-repository-mongo-bd";
import { UserService } from "../../core/applications/services/user-service"
import {productController} from "./product-controller";
import {cartController} from "./cart-controller";
import {productRepositoryBd} from "../driven/infra/product-repository-bd";
import {cartRepositoryMongoBd} from "../driven/infra/cart-repository-mongo-bd";
import {cartService} from "../../core/applications/services/cart-service";
import {productService} from "../../core/applications/services/product-service";
import {connectToDataBase} from "../driven/infra/db-connect";

import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {orderRepositoryMongoBd} from "../driven/infra/order-repository-mongo-bd";
import {orderService} from "../../core/applications/services/order-service";
import {orderController} from "./order-controller";

const userRepository = new userRepositoryMongoBd();
const productRepository = new productRepositoryBd();
const cartRepository = new cartRepositoryMongoBd();
const orderRepository = new orderRepositoryMongoBd();

const productS = new productService(productRepository,orderRepository, cartRepository);
const cartS = new cartService(cartRepository, productRepository, userRepository);
const userS= new UserService(userRepository);
const orderS = new orderService(orderRepository, cartRepository);

const userC = new userController(userS);
const productC = new productController(productS);
const cartC = new cartController(cartS);
const orderC = new orderController(orderS);

const app = express();

//https://medium.com/xp-inc/trabalhando-com-docker-node-js-typescript-mongodb-a341d42e1fc0
connectToDataBase()
    .then(()=> {
        app.use(express.json());
        app.use(morgan("tiny"));
        app.use(express.static("public"));

        app.get('/users/:id', userC.getUserById.bind(userC));
        app.post('/users', userC.createUser.bind(userC));

//products
        app.get('/product/categoria/:categoria', productC.getProductByCategory.bind(productC));
        app.get('/product/:id', productC.getProductById.bind(productC));
        app.post('/product/', productC.createProduct.bind(productC));
        app.delete('/product/:id', productC.deleteProductById.bind(productC));
        app.post('/product/:id', productC.updateProductById.bind(productC));
        app.post('/product/deactive/:id', productC.deactivateProductById.bind(productC));
        app.get('/products/active', productC.getActiveProducts.bind(productC));
        app.get('/products/all', productC.getAllProducts.bind(productC));


//cart
        app.post('/cart/', cartC.createCart.bind(cartC));
        app.post('/cart/user/:id', cartC.addUser.bind(cartC));
        app.post('/cart/product/:id', cartC.addProduct.bind(cartC));
        app.post('/cart/itens/:id', cartC.personalizeItens.bind(cartC));
        app.get('/cart/:id', cartC.resumeCart.bind(cartC));
        app.post('/cart/close/:id', cartC.closeCart.bind(cartC));
        app.post('/cart/pay/:id', cartC.payCart.bind(cartC));
        app.post('/cart/kitchen/:id', cartC.sendToKitchen.bind(cartC));
        app.post('/cart/cancel/:id', cartC.cancelCart.bind(cartC));

//order

        app.post('/order/receive/:id', orderC.receiveOrder.bind(orderC));
        app.post('/order/prepare/:id', orderC.prepareOrder.bind(orderC));
        app.get('/order/estimate/:id', orderC.estimateDelivery.bind(orderC));
        app.post('/order/update/ready/:id', orderC.updateStatusToReady.bind(orderC));
        app.post('/order/update/delivered/:id', orderC.updateStatusToDelivered.bind(orderC));
        app.post('/order/update/closed/:id', orderC.updateStatusToClosed.bind(orderC));
        app.get('/order/', orderC.getAllActiveOrders.bind(orderC));
//
        app.listen(8000, () => console.log('Server is listening on port 8000'));

    })
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});