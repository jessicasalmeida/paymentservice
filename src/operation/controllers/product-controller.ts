import express, { Request, Response } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import {Get, Route} from "tsoa";
import { ProductUseCase } from '../../domain/interfaces/use-cases/product-use-case';

export class ProductController {

    constructor(private readonly productUseCase: ProductUseCase) { }

    async getProductById(req: Request, res: Response) {
        /*  #swagger.parameters['$ref'] = ['#/components/parameters/someParameter1', '#/components/parameters/someParameter2'] */
        const id = req.params.id;
        const produto = await this.productUseCase.findProductById(id);
        res.status(200).json(produto);
    }

    async getProductByCategory(req: Request, res: Response) {
        const categoria = req.params.categoria;
        const produto = await this.productUseCase.findProductByCategory(categoria);
        res.status(200).json(produto);
    }

    async createProduct(req: Request, res: Response) {
        const newProduct = req.body;
        const product =  await this.productUseCase.createProduct(newProduct);
        res.status(200).json(product);
    }

    async deleteProductById(req: Request, res: Response) {
        const id = req.params.id;
        const isDelete =  await this.productUseCase.deleteProduct(id);
        if(isDelete) {
            res.status(200).json("Produto deletado com sucesso");
        }
        else{
            res.status(500).json("O produto está em um pedido ativo e não pode ser deletado")
        }
    }

    async updateProductById(req: Request, res: Response) {
        const id = req.params.id;
        const newProduct = req.body;
        const product =  await this.productUseCase.updateProduct(id, newProduct);
        res.status(200).json(product);
    }

    async deactivateProductById(req: Request, res: Response) {
        const id = req.params.id;
        const deactivate =  await this.productUseCase.deactivateProduct(id);
        if(deactivate) {
            res.status(200).json("Produto desativado com sucesso");
        }
        else{
            res.status(500).json("O produto está em um pedido ativo e não pode ser desativado")
        }
    }

    async getActiveProducts(req: Request, res: Response) {
        const product =  await this.productUseCase.getActiveProducts();
        res.status(200).json(product);
    }
    async getAllProducts(req: Request, res: Response) {
        const product =  await this.productUseCase.getAllProducts();
        res.status(200).json(product);
    }
}
