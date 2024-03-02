import { ProductRequestModel, ProductResponseModel } from "../../models/product";

export interface ProductUseCase {
    findProductById(id: string): Promise<ProductResponseModel>;
    findProductByCategory(category: string): Promise<ProductResponseModel[]>;
    createProduct(product: ProductRequestModel) : Promise<ProductResponseModel>;
    deleteProduct(id: string): Promise<boolean>;
    updateProduct(id: string, product: ProductRequestModel): Promise<ProductResponseModel>;
    getActiveProducts(): Promise<ProductResponseModel[]>;
    getAllProducts(): Promise<ProductResponseModel[]>;
    deactivateProduct(id: string): Promise<boolean>;
}