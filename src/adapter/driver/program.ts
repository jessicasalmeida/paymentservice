import express from "express";
import { UserController } from "./userController";
import { InMemoryUserRepository } from "../driven/infra/inMemoryUserRepository";
import { UserService } from "../../core/applications/services/userService"
import {ProductController} from "./productController";
import {CartController} from "./cartController";
import {InMemoryProductRepository} from "../driven/infra/inMemoryProductRepository";
import {InMemoryCartRepository} from "../driven/infra/inMemoryCartRepository";
import {CartService} from "../../core/applications/services/cartService";
import {ProductService} from "../../core/applications/services/productService";


import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {InMemoryOrderRepository} from "../driven/infra/inMemoryOrderRepository";
import {OrderService} from "../../core/applications/services/orderService";
import {OrderController} from "./orderController";

const userRepository = new InMemoryUserRepository();
const userService= new UserService(userRepository);
const userController = new UserController(userService);

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const cartRepository = new InMemoryCartRepository();
const cartService = new CartService(cartRepository, productRepository, userRepository);
const cartController = new CartController(cartService);

const orderRepository = new InMemoryOrderRepository();
const orderService = new OrderService(orderRepository, cartRepository);
const orderController = new OrderController(orderService);

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.get('/users/:id', userController.getUserById.bind(userController));

//produto
app.get('/produto/categoria/:categoria', productController.getProductByCategory.bind(productController));
app.get('/produto/:id', productController.getProductById.bind(productController));
app.post('/produto/', productController.createProduct.bind(productController));
app.delete('/produto/:id', productController.deleteProductById.bind(productController));
app.post('/produto/:id', productController.updateProductById.bind(productController));
app.post('/produto/deactive/:id', productController.deactivateProductById.bind(productController));
app.get('/produto/', productController.getActiveProducts.bind(productController));

//cart
app.post('/cart/', cartController.createCart.bind(cartController));
app.post('/cart/user/:id', cartController.addUser.bind(cartController));
app.post('/cart/product/:id', cartController.addProduct.bind(cartController));
app.post('/cart/itens/:id', cartController.personalizeItens.bind(cartController));
app.get('/cart/:id', cartController.resumeCart.bind(cartController));
app.post('/cart/close/:id', cartController.closeCart.bind(cartController));
app.post('/cart/pay/:id', cartController.payCart.bind(cartController));
app.post('/cart/kitchen/:id', cartController.sendToKitchen.bind(cartController));
app.post('/cart/cancel/:id', cartController.cancelCart.bind(cartController));

//order

app.post('/order/receive/:id', orderController.receiveOrder.bind(orderController));
app.post('/order/prepare/:id', orderController.prepareOrder.bind(orderController));
app.get('/order/estimate/:id', orderController.estimateDelivery.bind(orderController));
app.get('/order/notification/estimatedtime/:id', orderController.sendNotificationEstimatedTime.bind(orderController));
app.get('/order/notification/delivery/:id', orderController.sendNotificationDelivery.bind(orderController));
app.post('/order/update/ready/:id', orderController.updateStatusToReady.bind(orderController));
app.post('/order/update/delivered/:id', orderController.updateStatusToDelivered.bind(orderController));
app.post('/order/update/closed/:id', orderController.updateStatusToClosed.bind(orderController));
app.get('/order/', orderController.getAllActiveOrders.bind(orderController));

//
app.listen(8000, () => console.log('Server is listening on port 8000'));