import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {Get, Route} from "tsoa";
import {cartService} from "../../core/applications/services/cart-service";

export class cartController {
    constructor(private readonly cartService: cartService) { }

    async createCart(req: Request, res: Response) {
        const cart = await this.cartService.createCart();
        res.status(200).json(cart);
    }

    async addUser(req: Request, res: Response) {
        const idCart = req.params.id;
        const idUser = req.query.user as string;
        const cart = await this.cartService.addUser(idCart, idUser);
        res.status(200).json(cart);
    }

    async addProduct(req: Request, res: Response) {
        const idCart = req.params.id;
        const idProduct = req.query.product as string;
        const cart = await this.cartService.addProduct(idCart, idProduct);
        res.status(200).json(cart);
    }

    async personalizeItens(req: Request, res: Response) {
        const id = req.params.id;
        const product = req.query.product as string
        const options = req.query.options as Array<string>;
        const cart =  await this.cartService.personalizeItem(id, product, options);
        res.status(200).json(cart);
    }

    async resumeCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart = await this.cartService.resumeCart(id);
        res.status(200).json(cart);
    }

    async closeCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartService.closeCart(id);
        res.status(200).json(cart);
    }

    async payCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartService.payCart(id);
        res.status(200).json(cart);
    }

    async sendToKitchen(req: Request, res: Response) {
        const id = req.params.id;
        const cartSended =  await this.cartService.sendToKitchen(id);
        if(cartSended) {
            res.status(200).json("Pedido enviado a cozinha");
        }
        else {
            res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
        }
    }

    async cancelCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartService.cancelCart(id);
        res.status(200).json(cart);
    }
}
