import {CartRepository} from "../../../core/applications/ports/cartRepository";
import {Cart} from "../../../core/domain/cart";
import {Product} from "../../../core/domain/product";
import {User} from "../../../core/domain/user";

export class InMemoryCartRepository implements CartRepository {
    private readonly carts: Cart[] = [
        {
            id: "1",
            user: {} as User,
            products:  [] as Product[],
            totalValue: 0,
            status: "",
            payment: true
        }
    ];

    async createCart(newCart:Cart): Promise<Cart> {
        newCart.id = (this.carts.length+1).toString();
        this.carts.push(newCart);
        return newCart;
    }

    async updateCart(cart: Cart): Promise<Cart> {
        const index = this.carts.indexOf(await this.findCartById(cart.id));
        this.carts[index] = cart;
        return cart;
    }

    async findCartById(id: string) : Promise<Cart>
    {
        const cart = this.carts.find(u => u.id === id);
        if (!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart;
    }
}