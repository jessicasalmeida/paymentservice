import {Cart} from "../../domain/cart";
import {User} from "../../domain/user";
import {Product} from "../../domain/product";
import {Order} from "../../domain/order";

export interface CartRepository {
    createCart(newCart: Cart): Promise<Cart>;
    updateCart(cart: Cart) : Promise<Cart>;
    findCartById(id: string): Promise<Cart>;
}