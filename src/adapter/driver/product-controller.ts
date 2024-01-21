import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {productService} from "../../core/applications/services/product-service";
import {Product} from "../../core/domain/product";
import {Get, Route} from "tsoa";

export class productController {
    constructor(private readonly productService: productService) { }

    async getProductById(req: Request, res: Response) {
        const id = req.params.id;
        const produto = await this.productService.getProductById(id);
        res.status(200).json(produto);
    }

    async getProductByCategory(req: Request, res: Response) {
        const categoria = req.params.categoria;
        const produto = await this.productService.getProductByCategory(categoria);
        res.status(200).json(produto);
    }

    async createProduct(req: Request, res: Response) {
        const newProduct = req.body;
        const product =  await this.productService.createProduct(newProduct);
        res.status(200).json(product);
    }

    async deleteProductById(req: Request, res: Response) {
        const id = req.params.id;
        const product =  await this.productService.deleteProductById(id);
        res.status(200).json(product);
    }

    async updateProductById(req: Request, res: Response) {
        const id = req.params.id;
        const newProduct = req.body;
        const product =  await this.productService.updateProductById(id, newProduct);
        res.status(200).json(product);
    }

    async deactivateProductById(req: Request, res: Response) {
        const id = req.params.id;
        const deactivate =  await this.productService.deactivateProductById(id);
        if(deactivate) {
            res.status(200).json("Produto desativado com sucesso");
        }
        else{
            res.status(500).json("O produto está em um pedido ativo e não pode ser desativado")
        }
    }

    async getActiveProducts(req: Request, res: Response) {
        const product =  await this.productService.getActiveProducts();
        res.status(200).json(product);
    }
}
