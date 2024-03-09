import { generateRandomString } from '../../common/helpers/generators';
import { ProductGateway } from '../../operation/gateways/product';
import { ProductEntity } from '../entities/product';
import { OrderGateway } from '../../operation/gateways/order';
import { CartGateway } from '../../operation/gateways/cart';

export class ProductUseCase {

    static async findProductByCategory(id: string, productGateway: ProductGateway): Promise<ProductEntity[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products.filter((p) => p.category === id);
        }
        return null;
    }
    static async findProductById(id: string, productGateway: ProductGateway): Promise<ProductEntity | null> {
        const product = productGateway.getOne(id);
        if (product) {
            return product;
        }
        return null;
    }
    static async createProduct(name: string, options: Array<string>, price: number, timeToPrepare: number, category: string,
        status: boolean, productGateway: ProductGateway): Promise<ProductEntity | null> {
        const novoId = generateRandomString();
        const nProduct = new ProductEntity(
            novoId,
            name,
            options,
            price,
            timeToPrepare,
            category,
            status
        );
        const product = productGateway.createProduct(nProduct);
        if (product) {
            return product;
        }
        return null;

    }
    static async deleteProduct(id: string, productGateway: ProductGateway, orderGateway: OrderGateway, cartGateway: CartGateway): Promise<boolean> {
        const product = await ProductUseCase.findProductById(id, productGateway);
        if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, orderGateway, cartGateway))) {
            await productGateway.delete(id);
            return true;
        }
        else {
            return false
        }
    }
    static async updateProduct(id: string, name: string, options: Array<string>, price: number, timeToPrepare: number, category: string,
        status: boolean, productGateway: ProductGateway): Promise<ProductEntity | null> {
        const nProduct = new ProductEntity(
            id,
            name,
            options,
            price,
            timeToPrepare,
            category,
            status
        );
        const product = productGateway.update(id, nProduct);
        if (product) {
            return product;
        }
        return null;

    }
    static async deactivateProduct(id: string, productGateway: ProductGateway, orderGateway: OrderGateway, cartGateway: CartGateway): Promise<boolean> {
        const product = await productGateway.getOne(id);
        if (product) {
            if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, orderGateway, cartGateway))) {
                product.status = false;
                await productGateway.update(id, product)
                return true;
            }
            else {
                return false
            }
        }
        else {
            return false;
        }
    }
    static async getActiveProducts(productGateway: ProductGateway): Promise<ProductEntity[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products.filter((p) => p.status === true);
        }
        return null;
    }

    static async getAllProducts(productGateway: ProductGateway): Promise<ProductEntity[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products;
        }
        return null;
    }

    static async verifyActiveOrder(id: string, productGateway: ProductGateway, orderGateway: OrderGateway, cartGateway: CartGateway): Promise<boolean> {
        const orders = await orderGateway.getAll();
        if (orders) {
            let products = {} as ProductEntity[];
            for (const order of orders) {
                const cart = (await cartGateway.getOne(order.idCart));
                if (cart) {
                    products = cart.products as ProductEntity[];
                    products = products.filter((p) => p.id === id);
                    if (products.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}