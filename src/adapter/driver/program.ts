import express from "express";
import { UserController } from "./userController";
import { InMemoryUserRepository } from "../driven/infra/inMemoryUserRepository";
import { UserService } from "../../core/applications/services/userService"
import {ProductController} from "./productController";
import {CartController} from "./cartController";
import {InMemoryProductRepository} from "../driven/infra/inMemoryProductRepository";
import {InMemoryCartRepository} from "../driven/infra/inMemoryCartRepository";
import {CartService} from "../../core/applications/services/CartService";
import {ProductService} from "../../core/applications/services/ProductService";


import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const userRepository = new InMemoryUserRepository();
const userService= new UserService(userRepository);
const userController = new UserController(userService);

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const cartRepository = new InMemoryCartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

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


//
app.listen(8000, () => console.log('Server is listening on port 8000'));