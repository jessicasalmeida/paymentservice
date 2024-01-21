
import {Product} from "../../domain/product";
import {ProductRepository} from "../ports/productRepository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async getProductByCategory(id: string): Promise<Product> {
        return this.productRepository.findProductByCategory(id);
    }
    async getProductById(id: string): Promise<Product> {
        return this.productRepository.findProductById(id);
    }
    async createProduct(product: Product): Promise<Product> {
        return this.productRepository.createProduct(product);
    }
    async deleteProductById(id: string): Promise<Product[]> {
        const product = await this.productRepository.findProductById(id);
        return this.productRepository.deleteProduct(product);
    }
    async updateProductById(id: string, newProduct: Product): Promise<Product> {
        const olderProduct = await this.productRepository.findProductById(id);
        newProduct.id = olderProduct.id;
        return this.productRepository.updateProduct(newProduct);
    }
    async deactivateProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findProductById(id);
        product.status = false;
        return this.productRepository.updateProduct(product);
    }
    async getActiveProducts(): Promise<Product[]> {
        return this.productRepository.getActiveProducts();
    }


}