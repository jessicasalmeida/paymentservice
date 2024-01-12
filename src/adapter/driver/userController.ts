import express, { Request, Response } from 'express';
import {UserService} from "../../core/applications/services/userService";

export class UserController {
    constructor(private readonly userService: UserService) { }

    async getUserById(req: Request, res: Response) {
        const id = req.params.id;
        const user = await this.userService.getUserById(id);
        res.status(200).json(user);
    }

    async getProductById(req: Request, res: Response) {
        const id = req.params.id;
        const produto = await this.userService.getProductById(id);
        res.status(200).json(produto);
    }

    async getProductByCategory(req: Request, res: Response) {
        const categoria = req.params.categoria;
        const produto = await this.userService.getProductByCategory(categoria);
        res.status(200).json(produto);
    }

}
