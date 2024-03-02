import { ProductRepository } from '../interfaces/repositories/product-repository';
import ProductDataSource from "../../data/interfaces/data-sources/product-data-source";
import { ProductRequestModel, ProductResponseModel } from '../models/product';
export default class ProductRepositoryImpl implements ProductRepository
{
    productDataSource : ProductDataSource
    constructor(productDataSource: ProductDataSource)
    {
        this.productDataSource = productDataSource;
     }

    async findProductById(id: string): Promise<ProductResponseModel> {
        return this.productDataSource.getOne(id);
    }
    async createProduct(product: ProductRequestModel): Promise<ProductResponseModel> {
        return this.productDataSource.create(product);
    }

    async deleteProduct(id: string): Promise<void> {
        const deleteProduct = await this.productDataSource.delete(id);
    }
    async updateProduct(id: string, newProduct: ProductRequestModel): Promise<ProductResponseModel> {
        const data = await this.productDataSource.update(id, newProduct);
        return this.productDataSource.update(id, data);
    }

    async getAllProducts(): Promise<ProductResponseModel[]> {
        return await this.productDataSource.getAll();
    }
}