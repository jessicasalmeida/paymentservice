
import {Product} from "../../domain/product";
import {ProductRepository} from "../ports/productRepository";
import {OrderRepository} from "../ports/orderRepository";
import {CartRepository} from "../ports/cartRepository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository,
                private readonly orderRepository: OrderRepository,
                private readonly cartRepository : CartRepository) { }

    async getProductByCategory(id: string): Promise<Product> {
        return this.productRepository.findProductByCategory(id);
    }
    async getProductById(id: string): Promise<Product> {
        return this.productRepository.findProductById(id);
    }
    async createProduct(product: Product): Promise<Product> {
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
    async updateProductById(id: string, newProduct: Product): Promise<Product> {
        const olderProduct = await this.productRepository.findProductById(id);
        newProduct.id = olderProduct.id;
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
    async getActiveProducts(): Promise<Product[]> {
        return this.productRepository.getActiveProducts();
    }

    async verifyActiveOrder(id: string): Promise<boolean>
    {
        const orders = await this.orderRepository.getActiveOrders();
        let products = {} as Product[];
        for (const order of orders) {
            products = (await this.cartRepository.findCartById(order.idCart)).products.filter(p => p.id === id);
            if(products){
                return false;
            }
        }
        return true;
    }

}