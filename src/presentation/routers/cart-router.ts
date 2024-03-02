import express, {Router} from "express";
import {CartController} from "../controllers/cart-controller";
import {userRepositoryMongoBd} from "../../data/data-sources/mongodb/user-repository-mongo-bd";
import {ProductRepositoryMongoBd} from "../../data/data-sources/mongodb/product-repository-mongo-bd";
import {CartRepositoryMongoBd} from "../../data/data-sources/mongodb/cart-repository-mongo-bd";
import { CartUseCaseImpl } from '../../domain/use-cases/cart-use-case';
import CartRepositoryImpl from "../../domain/repositories/cart-repository";
import userRepositoryImpl from "../../domain/repositories/user-repository";
import ProductRepositoryImpl from "../../domain/repositories/product-repository";

const productRepository = new ProductRepositoryMongoBd();
const cartRepository = new CartRepositoryMongoBd();
const userRepository = new userRepositoryMongoBd();

const cartR = new CartRepositoryImpl(cartRepository);
const cartUC = new CartUseCaseImpl(cartR, new userRepositoryImpl(userRepository), new ProductRepositoryImpl(productRepository));
const cartC = new CartController(cartUC);

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