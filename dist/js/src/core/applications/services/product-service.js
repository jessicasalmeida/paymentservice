"use strict";
/*
import product from "../../domain/product";
import {productRepository} from "../ports/product-repository";
import {orderRepository} from "../ports/order-repository";
import {cartRepository} from "../../../domain/interfaces/repositories/cart-repository";
import {ObjectId} from "mongodb";
import cart from "../../../domain/models/cart";

export class productService {
    constructor(private readonly productRepository: productRepository,
                private readonly orderRepository: orderRepository,
                private readonly cartRepository : cartRepository) { }

    async getProductByCategory(id: string): Promise<product[]> {
        return this.productRepository.findProductByCategory(id);
    }
    async getProductById(id: string): Promise<product> {
        return this.productRepository.findProductById(id);
    }
    async createProduct(product: product): Promise<product> {
        return this.productRepository.createProduct(product);
    }
    async deleteProductById(id: string): Promise<boolean> {
        const product = await this.productRepository.findProductById(id);
        if(!(await this.verifyActiveOrder(id))) {
            await this.productRepository.deleteProduct(product);
            return true;
        }
        else {
            return false
        }
    }
    async updateProductById(id: string, newProduct: product): Promise<product> {
        const olderProduct = await this.productRepository.findProductById(id);
        newProduct._id = olderProduct._id;
        return this.productRepository.updateProduct(newProduct);
    }
    async deactivateProductById(id: string): Promise<boolean> {
        const product = await this.productRepository.findProductById(id);
        if(!(await this.verifyActiveOrder(id))) {
            product.status = false;
            await this.productRepository.updateProduct(product)
            return true;
        }
        else {
            return false
        }
    }
    async getActiveProducts(): Promise<product[]> {
        return this.productRepository.getActiveProducts();
    }

    async getAllProducts(): Promise<product[]> {
        return this.productRepository.getAllProducts();
    }

    async verifyActiveOrder(id: string): Promise<boolean>
    {
        
        const idProduct = new ObjectId(id);
        const orders = await this.orderRepository.getActiveOrders();
        let products = {} as product[];
        for (const order of orders) {
            const cart = (await this.cartRepository.findCartById(order.idCart)) as cart;
            products = cart.products.filter((p) => p._id.equals(idProduct));
            if(products.length>0){
                return true;
            }
        }
        return false;
    }
} */ 
