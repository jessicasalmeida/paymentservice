import express, {Router} from "express";
import {cartService} from "../../../core/applications/services/cart-service";
import {cartController} from "../controllers/cart-controller";
import {userRepositoryMongoBd} from "../../driven/infra/user-repository-mongo-bd";
import {productRepositoryBd} from "../../driven/infra/product-repository-bd";
import {cartRepositoryMongoBd} from "../../driven/infra/cart-repository-mongo-bd";

const userRepository = new userRepositoryMongoBd();
const productRepository = new productRepositoryBd();
const cartRepository = new cartRepositoryMongoBd();
const cartS = new cartService(cartRepository, productRepository, userRepository);
const cartC = new cartController(cartS);

export const cartRouter = Router();

cartRouter.use(express.json());
cartRouter.post('/', cartC.createCart.bind(cartC));
cartRouter.post('/user/:id', cartC.addUser.bind(cartC));
cartRouter.post('/product/:id', cartC.addProduct.bind(cartC));
cartRouter.post('/itens/:id', cartC.personalizeItens.bind(cartC));
cartRouter.get('/:id', cartC.resumeCart.bind(cartC));
cartRouter.post('/close/:id', cartC.closeCart.bind(cartC));
cartRouter.post('/pay/:id', cartC.payCart.bind(cartC));
cartRouter.post('/kitchen/:id', cartC.sendToKitchen.bind(cartC));
cartRouter.post('/cancel/:id', cartC.cancelCart.bind(cartC));