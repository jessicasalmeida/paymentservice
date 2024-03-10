import express, { Router } from "express";
import { ProductRepositoryMongoBd } from "../../data-sources/mongodb/product-repository-mongo-bd";
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { userRepositoryMongoBd } from "../../data-sources/mongodb/user-repository-mongo-bd";
import { CartController } from "../../../operation/controllers/cart-controller";

const productRepository = new ProductRepositoryMongoBd();
const cartRepository = new CartRepositoryMongoBd();
const userRepository = new userRepositoryMongoBd();

export const cartRouter = Router();

cartRouter.use(express.json());
cartRouter.post('/', async (req, res) => {
    const cart = await CartController.createCart(cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/user/:id', async (req, res) => {
    const idCart = req.params.id;
    const idUser = req.query.user as string;
    const cart = await CartController.addUser(idCart, idUser, cartRepository, userRepository);
    res.status(200).json(cart);
});

cartRouter.post('/product/:id', async (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.query.product as string;
    const cart = await CartController.addProduct(idCart, idProduct, cartRepository, productRepository);
    res.status(200).json(cart);
});

cartRouter.post('/itens/:id', async (req, res) => {
    const id = req.params.id;
    const product = req.query.product as string
    const options = req.query.options as Array<string>;
    const cart = await CartController.personalizeItens(id, product, options, cartRepository);
    res.status(200).json(cart);
});

cartRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.resumeCart(id, cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/close/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.closeCart(id, cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/pay/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.payCart(id, cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/kitchen/:id', async (req, res) => {
    const id = req.params.id;
    const cartSended = await CartController.sendToKitchen(id, cartRepository);
    if (cartSended) {
        res.status(200).json("Pedido enviado a cozinha");
    }
    else {
        res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
    }
});

cartRouter.post('/cancel/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await CartController.cancelCart(id, cartRepository);
    res.status(200).json(cart);
});