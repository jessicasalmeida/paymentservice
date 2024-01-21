import express from "express"
import PingController from "./pingController";
import {InMemoryUserRepository} from "../driven/infra/inMemoryUserRepository";
import {UserService} from "../../core/applications/services/userService";
import {UserController} from "./userController";
import {InMemoryProductRepository} from "../driven/infra/inMemoryProductRepository";
import {ProductService} from "../../core/applications/services/productService";
import {ProductController} from "./productController";
import {InMemoryCartRepository} from "../driven/infra/inMemoryCartRepository";
import {InMemoryOrderRepository} from "../driven/infra/inMemoryOrderRepository";
import {CartService} from "../../core/applications/services/cartService";
import {OrderService} from "../../core/applications/services/orderService";
import {CartController} from "./cartController";
import {OrderController} from "./orderController";

const router = express.Router();

const userRepository = new InMemoryUserRepository();
const userService= new UserService(userRepository);
const userController = new UserController(userService);

const productRepository = new InMemoryProductRepository();
const cartRepository = new InMemoryCartRepository();
const orderRepository = new InMemoryOrderRepository();

const productService = new ProductService(productRepository,orderRepository, cartRepository);
const cartService = new CartService(cartRepository, productRepository, userRepository);
const orderService = new OrderService(orderRepository, cartRepository);

const productController = new ProductController(productService);
const cartController = new CartController(cartService);
const orderController = new OrderController(orderService);

router.get("/ping", async (_req, res) => {
    const controller = new  PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.get('/users/:id', userController.getUserById.bind(userController));

router.get('/produto/categoria/:categoria', productController.getProductByCategory.bind(productController));

router.get('/produto/:id', productController.getProductById.bind(productController));

router.post('/produto/', productController.createProduct.bind(productController));

router.delete('/produto/:id', productController.deleteProductById.bind(productController));

router.post('/produto/:id', productController.updateProductById.bind(productController));

router.post('/produto/:id', productController.deactivateProductById.bind(productController));

router.get('/produto/', productController.getActiveProducts.bind(productController));


export default router;