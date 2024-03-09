import express, { Router } from "express";
import { ProductRepositoryMongoBd } from "../../data-sources/mongodb/product-repository-mongo-bd";
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { userRepositoryMongoBd } from "../../data-sources/mongodb/user-repository-mongo-bd";
import { UserUseCase } from "../../../core/usercases/user-use-case";
import { UserGateway } from "../../../operation/gateways/user";
import { CartGateway } from "../../../operation/gateways/cart";
import { CartUseCase } from "../../../core/usercases/cart-use-case";
import { CartController } from "../../../operation/controllers/cart-controller";
import { ProductGateway } from '../../../operation/gateways/product';

const productRepository = new ProductRepositoryMongoBd();
const cartRepository = new CartRepositoryMongoBd();
const userRepository = new userRepositoryMongoBd();

const cartGateway = new CartGateway(cartRepository);
const productGateway = new ProductGateway(productRepository);
const userGateway = new UserGateway(userRepository);

export const cartRouter = Router();


cartRouter.use(express.json());
cartRouter.post('/', async (req, res) => {
    const cart = await CartUseCase.createCart(cartGateway);
    res.status(200).json(cart);
});

cartRouter.post('/user/:id', async (req, res) => {
    const idCart = req.params.id;
    const idUser = req.query.user as string;
    const cart = await CartController.addUser(idCart, idUser);
    res.status(200).json(cart);
});

cartRouter.post('/product/:id', async (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.query.product as string;
    const cart = await CartController.addProduct(idCart, idProduct);
    res.status(200).json(cart);
});

cartRouter.post('/itens/:id', async (req, res) => {
    const id = req.params.id;
    const product = req.query.product as string
    const options = req.query.options as Array<string>;
    const cart = await CartController.personalizeItem(id, product, options);
    res.status(200).json(cart);
});

cartRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = req.query.product as string
    const options = req.query.options as Array<string>;
    const cart = await CartController.personalizeItem(id, product, options);
    res.status(200).json(cart);
});

cartRouter.post('/close/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.closeCart(id);
    res.status(200).json(cart);
});

cartRouter.post('/pay/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.payCart(id);
    res.status(200).json(cart);
});

cartRouter.post('/kitchen/:id', async (req, res) => {
    const id = req.params.id;
    const cartSended = await CartController.sendToKitchen(id);
    if (cartSended) {
        res.status(200).json("Pedido enviado a cozinha");
    }
    else {
        res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
    }
});
cartRouter.post('/cancel/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.cancelCart(id);
    res.status(200).json(cart);
});