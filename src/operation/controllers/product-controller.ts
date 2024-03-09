import { ProductUseCase } from '../../core/usercases/product-use-case';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductGateway } from '../gateways/product';
import { ProductPresenter } from '../presenters/product';
import { ProductDTO, NewProductDTO } from '../../common/dtos/product.dto';
import { ProductEntity } from '../../core/entities/product';
import { OrderDataSource } from '../../common/interfaces/order-data-source';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { OrderGateway } from '../gateways/order';
import { CartGateway } from '../gateways/cart';

export class ProductController {

    constructor(private readonly productUseCase: ProductUseCase) { }

    static async getProductById(id: string, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.findProductById(id, productGateway);
        if (!product) {
            return null;
        }
        return ProductPresenter.toDTO(product);
    }

    static async getProductByCategory(category: string, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.findProductByCategory(category, productGateway);
        if (!product) {
            return null;
        }
        const productDTO: ProductDTO[] = new Array();
        product.forEach(element => {
            productDTO.push(ProductPresenter.toDTO(element));
        });
        return productDTO;
    }

    static async createProduct(newProductDTO: NewProductDTO, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = ProductUseCase.createProduct(newProductDTO.name, newProductDTO.options,
            newProductDTO.price, newProductDTO.timeToPrepare, newProductDTO.category,
            newProductDTO.status, productGateway) as unknown as ProductEntity;
        if (product) {
            ProductPresenter.toDTO(product);
        }
        return null;
    }

    static async deleteProductById(id: string, productDataSource: ProductDataSource, orderDataSource: OrderDataSource, cartDataSource: CartDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        const orderGateway = new OrderGateway(orderDataSource);
        const cartGateway = new CartGateway(cartDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        return ProductUseCase.deleteProduct(id, productGateway, orderGateway, cartGateway);
    }

    static async updateProductById(id: string, newProductDTO: NewProductDTO, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.updateProduct(id, newProductDTO.name, newProductDTO.options, newProductDTO.price, newProductDTO.timeToPrepare, newProductDTO.category, newProductDTO.status, productGateway);
        if (!product) {
            return null;
        }
        return ProductPresenter.toDTO(product);
    }

    static async deactivateProductById(id: string, productDataSource: ProductDataSource, orderDataSource: OrderDataSource, cartDataSource: CartDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        const orderGateway = new OrderGateway(orderDataSource);
        const cartGateway = new CartGateway(cartDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        return ProductUseCase.deactivateProduct(id, productGateway, orderGateway, cartGateway);

    }

    static async getActiveProducts(productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = ProductUseCase.getActiveProducts(productGateway) as unknown as ProductEntity[];
        if (!product) {
            return null;
        }
        const productDTO: ProductDTO[] = new Array();
        product.forEach(element => {
            productDTO.push(ProductPresenter.toDTO(element));
        });
        return productDTO;
    }

    static async getAllProducts(productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = ProductUseCase.getAllProducts(productGateway) as unknown as ProductEntity[];
        if (!product) {
            return null;
        }
        const productDTO: ProductDTO[] = new Array();
        product.forEach(element => {
            productDTO.push(ProductPresenter.toDTO(element));
        });
        return productDTO;
    }
}
