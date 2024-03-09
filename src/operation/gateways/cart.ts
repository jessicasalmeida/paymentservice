import { CartDTO } from '../../common/dtos/cart.dto';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartEntity } from '../../core/entities/cart';

export class CartGateway {
    cartDataSource: CartDataSource;
    constructor(cartDataSource: CartDataSource) {
        this.cartDataSource = cartDataSource;
    }

    async createcart(cart: CartEntity): Promise<CartEntity | null> {

        const cartDTO: CartDTO =
        {
            id: cart.id,
            user: cart.user,
            products: cart.products,
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };

        const sucesso = await this.cartDataSource.create(cartDTO);
        return sucesso;
    }

    async getOne(id: string): Promise<CartEntity | null> {
        const data = await this.cartDataSource.getOne(id);
        if (data) {
            const dataEntity = new CartEntity(
                (id = data.id), data.user, data.products, data.totalValue, data.status, data.payment);
            return dataEntity;
        }
        return null;
    }

    async update(id: string, cart: CartEntity): Promise<CartEntity | null> {
        const cartDTO: CartDTO =
        {
            id: cart.id,
            user: cart.user,
            products: cart.products,
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };

        const data = await this.cartDataSource.update(id, cartDTO);
        if (data) {
            const dataEntity = new CartEntity(
                (id = data.id), data.user, data.products, data.totalValue, data.status, data.payment);
            return dataEntity;
        }
        return null;
    }
}