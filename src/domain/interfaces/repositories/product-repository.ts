import { ProductRequestModel, ProductResponseModel } from "../../models/product";

export interface ProductRepository {
    findProductById(id: string): Promise<ProductResponseModel>;
    createProduct(product: ProductRequestModel) : Promise<ProductResponseModel>;
    deleteProduct(id: string): Promise<void> ;
    updateProduct(id: string, product: ProductRequestModel): Promise<ProductResponseModel>;
    getAllProducts(): Promise<ProductResponseModel[]>;
}