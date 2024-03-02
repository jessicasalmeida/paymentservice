import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {Get, Route} from "tsoa";
import { CartUseCase } from '../../domain/interfaces/use-cases/cart-use-case';

export class CartController {
    constructor(private readonly cartUseCase: CartUseCase) { }

    async createCart(req: Request, res: Response) {
        const cart = await this.cartUseCase.createCart();
        res.status(200).json(cart);
    }

    async addUser(req: Request, res: Response) {
        const idCart = req.params.id;
        const idUser = req.query.user as string;
        const cart = await this.cartUseCase.addUser(idCart, idUser);
        res.status(200).json(cart);
    }

    async addProduct(req: Request, res: Response) {
        const idCart = req.params.id;
        const idProduct = req.query.product as string;
        const cart = await this.cartUseCase.addProduct(idCart, idProduct);
        res.status(200).json(cart);
    }

    async personalizeItens(req: Request, res: Response) {
        const id = req.params.id;
        const product = req.query.product as string
        const options = req.query.options as Array<string>;
        const cart =  await this.cartUseCase.personalizeItem(id, product, options);
        res.status(200).json(cart);
    }

    async resumeCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart = await this.cartUseCase.resumeCart(id);
        res.status(200).json(cart);
    }

    async closeCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartUseCase.closeCart(id);
        res.status(200).json(cart);
    }

    async payCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartUseCase.payCart(id);
        res.status(200).json(cart);
    }

    async sendToKitchen(req: Request, res: Response) {
        const id = req.params.id;
        const cartSended =  await this.cartUseCase.sendToKitchen(id);
        if(cartSended) {
            res.status(200).json("Pedido enviado a cozinha");
        }
        else {
            res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
        }
    }

    async cancelCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartUseCase.cancelCart(id);
        res.status(200).json(cart);
    }
}
