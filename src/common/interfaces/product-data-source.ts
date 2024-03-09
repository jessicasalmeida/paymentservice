import { ProductRequestModel, ProductResponseModel } from '../../../domain/models/product';

export default interface ProductDataSource {
    getOne(id: string): Promise<ProductResponseModel>;
    create(product: ProductRequestModel) : Promise<ProductResponseModel>;
    delete(id: string): Promise<boolean>;
    update(id:string, product: ProductRequestModel): Promise<ProductResponseModel>;
    getAll(): Promise<ProductResponseModel[]>;
}