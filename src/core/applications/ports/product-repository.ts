import product from "../../domain/product";

export interface productRepository {
    findProductById(id: string): Promise<product>;
    findProductByCategory(category: string): Promise<product[]>;
    createProduct(product: product) : Promise<product>;
    deleteProduct(product: product): Promise<product[]>;
    updateProduct(product: product): Promise<product>;
    getActiveProducts(): Promise<product[]>;
    getAllProducts(): Promise<product[]>;
}