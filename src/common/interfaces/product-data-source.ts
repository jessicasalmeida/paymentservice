import { ProductDTO } from '../dtos/product.dto';

export default interface ProductDataSource {
    getOne(id: string): Promise<ProductDTO>;
    create(product: ProductDTO) : Promise<ProductDTO>;
    delete(id: string): Promise<boolean>;
    update(id:string, product: ProductDTO): Promise<ProductDTO>;
    getAll(): Promise<ProductDTO[]>;
}