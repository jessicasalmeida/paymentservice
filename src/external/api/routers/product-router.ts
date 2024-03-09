import express, {Router} from "express";

import {ProductController} from "../../operation/controllers/product-controller";
import ProductRepositoryImpl from "../../domain/repositories/product-repository";
import { ProductUseCaseImpl } from "../../domain/use-cases/product-use-case";

import { ProductRepositoryMongoBd } from "../../data/data-sources/mongodb/product-repository-mongo-bd";
import { OrderRepositoryMongoBd } from "../../data/data-sources/mongodb/order-repository-mongo-bd";
import { CartRepositoryMongoBd } from "../../data/data-sources/mongodb/cart-repository-mongo-bd";
import { OrderRepositoryImpl } from '../../domain/repositories/order-repository';
import CartRepositoryImpl from "../../domain/repositories/cart-repository";

const productRepository = new ProductRepositoryMongoBd();
const orderRepository = new OrderRepositoryMongoBd();
const cartRepository = new CartRepositoryMongoBd();

const productR = new ProductRepositoryImpl(productRepository);
const productUC = new ProductUseCaseImpl(productR, new OrderRepositoryImpl(orderRepository), new CartRepositoryImpl(cartRepository));
const productC = new ProductController(productUC);

export const productRouter = Router();

productRouter.use(express.json());
productRouter.get('/categoria/:categoria', productC.getProductByCategory.bind(productC));
productRouter.get('/:id', productC.getProductById.bind(productC));
/*
           #swagger.tags = ['Products']
           #swagger.summary = 'Returns a product by id'
           #swagger.description = 'This endpoint will return a product by id'
       */
productRouter.post('/', productC.createProduct.bind(productC));
productRouter.delete('/:id', productC.deleteProductById.bind(productC));
productRouter.post('/:id', productC.updateProductById.bind(productC));
productRouter.post('/deactive/:id', productC.deactivateProductById.bind(productC));
productRouter.get('/', productC.getAllProducts.bind(productC));