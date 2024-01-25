import express, {Router} from "express";
import {productRepositoryBd} from "../../driven/infra/product-repository-bd";
import {cartRepositoryMongoBd} from "../../driven/infra/cart-repository-mongo-bd";
import {orderRepositoryMongoBd} from "../../driven/infra/order-repository-mongo-bd";
import {productService} from "../../../core/applications/services/product-service";
import {productController} from "../controllers/product-controller";

const productRepository = new productRepositoryBd();
const cartRepository = new cartRepositoryMongoBd();
const orderRepository = new orderRepositoryMongoBd();

const productS = new productService(productRepository,orderRepository, cartRepository);
const productC = new productController(productS);

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