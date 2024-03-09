import express, { Router } from "express";
import { ProductRepositoryMongoBd } from "../../data-sources/mongodb/product-repository-mongo-bd";
import { OrderRepositoryMongoBd } from "../../data-sources/mongodb/order-repository-mongo-bd";
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { ProductController } from "../../../operation/controllers/product-controller";

const productRepository = new ProductRepositoryMongoBd();
const orderRepository = new OrderRepositoryMongoBd();
const cartRepository = new CartRepositoryMongoBd();

export const productRouter = Router();

productRouter.use(express.json());
productRouter.get('/categoria/:categoria', async (req, res) => {
    const categoria = req.params.categoria;
    const produto = await ProductController.getProductByCategory(categoria, productRepository);
    res.status(200).json(produto);
});

productRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await ProductController.getProductById(id, productRepository);
    res.status(200).json(product);
});

productRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    const product = await ProductController.createProduct(newProduct, productRepository);
    res.status(200).json(product);
});
productRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await ProductController.deleteProductById(id, productRepository, orderRepository, cartRepository);
    if (product) {
        res.status(200).json("Produto deletado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser deletado")
    }
});

productRouter.post('/:id', async (req, res) => {
    const id = req.params.id;
    const newProduct = req.body;
    const product = await ProductController.updateProductById(id, newProduct, productRepository);
    res.status(200).json(product);
});


productRouter.post('/deactive/:id', async (req, res) => {
    const id = req.params.id;
    const product = await ProductController.deactivateProductById(id, productRepository, orderRepository, cartRepository);
    if (product) {
        res.status(200).json("Produto desativado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser desativado")
    }
});

productRouter.get('/', async (req, res) => {
    const product = await ProductController.getAllProducts(productRepository);
    res.status(200).json(product);
});


