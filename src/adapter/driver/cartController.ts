import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {Get, Route} from "tsoa";
import {CartService} from "../../core/applications/services/CartService";

export class CartController {
    constructor(private readonly cartService: CartService) { }

    async createCart(req: Request, res: Response) {
        const cart = await this.cartService.createCart();
        res.status(200).json(cart);
    }

    async addUser(req: Request, res: Response) {
        const idCart = req.params.cart;
        const idUser = req.params.user;
        const cart = await this.cartService.addUser(idCart, idUser);
        res.status(200).json(cart);
    }

    async addProduct(req: Request, res: Response) {
        const idCart = req.params.cart;
        const idProduct = req.params.user;
        const cart = await this.cartService.addProduct(idCart, idProduct);
        res.status(200).json(cart);
    }

    async personalizeItens(req: Request, res: Response) {
        const id = req.params.id;
        const observacoes = req.params.observacoes;
        const cart =  await this.cartService.personalizeItens(id, observacoes);
        res.status(200).json(cart);
    }

    async resumeCart(req: Request, res: Response) {
        const id = req.params.id;
        const cart =  await this.cartService.resumeCart(id);
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
        const cart =  await this.cartService.payCart(id);
        res.status(200).json(cart);
    }
}
