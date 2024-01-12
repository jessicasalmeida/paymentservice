import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";

export interface ProductRepository {
    getProductById(id: string): Promise<Produto>;
    getProductByCategory(id: string): Promise<Produto>;
    createProduct(product: Produto) : Promise<Produto>;
    deleteProduct(product: Produto) : Promise<Produto>;
    updateProduct(id: string, product: Produto): Promise<Produto>;
    deactivateProduct(id: string): Promise<Produto>;
    getProducts(): Promise<Produto[]>;
}