import { ProductUseCase } from '../interfaces/use-cases/product-use-case';
import { ProductRepository } from '../interfaces/repositories/product-repository';
import { ProductRequestModel, ProductResponseModel } from '../models/product';
import { CartDTO =} from '../../common/dtos/cart.dto';
import { OrderRepository } from '../interfaces/repositories/order-repository';
import { CartRepository } from '../interfaces/repositories/cart-repository';

export class ProductUseCaseImpl implements ProductUseCase{
    productRepository: ProductRepository;
    order : OrderRepository;
    cart: CartRepository;

    constructor( productRepository: ProductRepository,  order : OrderRepository,cart: CartRepository){
        this.productRepository = productRepository;
        this.order = order;
        this.cart = cart;
    }

    async findProductByCategory(id: string): Promise<ProductResponseModel[]> {
        const products = await this.productRepository.getAllProducts();
        return products.filter((p) => p.category === id);
    }
    async findProductById(id: string): Promise<ProductResponseModel> {
        return this.productRepository.findProductById(id);
    }
    async createProduct(product: ProductRequestModel): Promise<ProductResponseModel> {
        return this.productRepository.createProduct(product);
    }
    async deleteProduct(id: string): Promise<boolean> {
        const product = await this.productRepository.findProductById(id);
        if(!(await this.verifyActiveOrder(id))) {
            await this.productRepository.deleteProduct(id);
            return true;
        }
        else {
            return false
        }
    }
    async updateProduct(id: string, newProduct: ProductRequestModel): Promise<ProductResponseModel> {
        return this.productRepository.updateProduct(id, newProduct);
    }
    async deactivateProduct(id: string): Promise<boolean> {
        const product = await this.productRepository.findProductById(id);
        if(!(await this.verifyActiveOrder(id))) {
            product.status = false;
            await this.productRepository.updateProduct(id, product)
            return true;
        }
        else {
            return false
        }
    }
    async getActiveProducts(): Promise<ProductResponseModel[]> {
        const products = await this.productRepository.getAllProducts();
        return products.filter((p) => p.status === true);
    }

    async getAllProducts(): Promise<ProductResponseModel[]> {
        return this.productRepository.getAllProducts();
    }

    async verifyActiveOrder(id: string): Promise<boolean>
    {
        const orders = await this.order.getAllOrders();
        let products = {} as ProductResponseModel[];
        for (const order of orders) {
            const cart = (await this.cart.getOne(order.idCart)) as CartDTO =;
            products = cart.products as ProductResponseModel[];
            products = products.filter((p) => p._id === id);
            if(products.length>0){
                return true;
            }
        }
        return false;
    }
}