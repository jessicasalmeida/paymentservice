import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductEntity } from '../../core/entities/product';
import { ProductDTO } from '../../common/dtos/product.dto';

export class ProductGateway {
    productDataSource: ProductDataSource;
    constructor(productDataSource: ProductDataSource) {
        this.productDataSource = productDataSource;
    }

    async createProduct(product: ProductEntity): Promise<ProductEntity | null> {

        const productDTO: ProductDTO =
        {
            id: product.id,
            name: product.name,
            category: product.category,
            options: product.options,
            price: product.price,
            timeToPrepare: product.timeToPrepare,
            status: product.status
        };

        const sucesso = await this.productDataSource.create(productDTO);
        return sucesso;
    }

    async getOne(id: string): Promise<ProductEntity | null> {
        const data = await this.productDataSource.getOne(id);
        if (data) {
            const dataEntity = new ProductEntity(
                (id = data.id), data.name, data.options, data.price, data.timeToPrepare, data.category, data.status);
            return dataEntity;
        }
        return null;
    }

    async update(id: string, product: ProductEntity): Promise<ProductEntity | null> {
        const productDTO: ProductDTO =
        {
            id: product.id,
            name: product.name,
            category: product.category,
            options: product.options,
            price: product.price,
            timeToPrepare: product.timeToPrepare,
            status: product.status
        };

        const data = await this.productDataSource.update(id, productDTO);
        if (data) {
            const dataEntity = new ProductEntity(
                (id = data.id), data.name, data.options, data.price, data.timeToPrepare, data.category, data.status);
            return dataEntity;
        }
        return null;
    }

    async getAll(): Promise<ProductEntity[] | null> {

        const data = await this.productDataSource.getAll();
        if (data) {
            var dataEntity: Array<ProductEntity> = new Array();
            data.forEach(data => {
                dataEntity.push(new ProductEntity(
                    data.id, data.name, data.options, data.price, data.timeToPrepare, data.category, data.status));
            });

            return dataEntity;
        }
        return null;
    }

    async delete(id: string): Promise<boolean> {
        const data = await this.productDataSource.delete(id);
        return data;
    }
}