
import {Produto} from "../../domain/produto";
import {ProductRepository} from "../ports/productRepository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async getProductByCategory(id: string): Promise<Produto> {
        return this.productRepository.getProductByCategory(id);
    }
    async getProductById(id: string): Promise<Produto> {
        return this.productRepository.getProductById(id);
    }
    async createProduct(product: Produto): Promise<Produto> {
        return this.productRepository.createProduct(product);
    }
    async deleteProductById(id: String): Promise<Produto[]> {
        return this.productRepository.deleteProductById(id);
    }
    async updateProductById(id: string, product: Produto): Promise<Produto> {
        return this.productRepository.updateProductById(id, product);
    }
    async deactivateProductById(id: string): Promise<Produto> {
        return this.productRepository.deactivateProductById(id);
    }
    async getActiveProducts(): Promise<Produto[]> {
        return this.productRepository.getActiveProducts();
    }


}