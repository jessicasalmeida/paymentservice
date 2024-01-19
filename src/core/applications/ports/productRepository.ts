import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";

export interface ProductRepository {
    getProductById(id: string): Promise<Produto>;
    getProductByCategory(id: string): Promise<Produto>;
    createProduct(product: Produto) : Promise<Produto>;
    deleteProductById(id: String): Promise<Produto[]>;
    updateProductById(id: string, product: Produto): Promise<Produto>;
    deactivateProductById(id: string): Promise<Produto>;
    getActiveProducts(): Promise<Produto[]>;
    getProducts(): Promise<Produto[]>;
}