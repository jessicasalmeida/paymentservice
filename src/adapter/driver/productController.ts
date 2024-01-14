import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {ProductService} from "../../core/applications/services/ProductService";
import {Produto} from "../../core/domain/produto";
import {Get, Route} from "tsoa";

export class ProductController {
    constructor(private readonly productService: ProductService) { }

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

    async createProduct(req: Request<ParamsDictionary, any, Produto>, res: Response) {
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
        const product =  await this.productService.deactivateProductById(id);
        res.status(200).json(product);
    }

    async getActiveProducts(req: Request, res: Response) {
        const product =  await this.productService.getActiveProducts();
        res.status(200).json(product);
    }
}
