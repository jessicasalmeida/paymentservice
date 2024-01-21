import {Product} from "../../domain/product";

export interface productRepository {
    findProductById(id: string): Promise<Product>;
    findProductByCategory(category: string): Promise<Product>;
    createProduct(product: Product) : Promise<Product>;
    deleteProduct(product: Product): Promise<Product[]>;
    updateProduct(product: Product): Promise<Product>;
    getActiveProducts(): Promise<Product[]>;
    getAllProducts(): Promise<Product[]>;
}