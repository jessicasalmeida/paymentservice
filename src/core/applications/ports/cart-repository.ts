import {Cart} from "../../domain/cart";
import {user} from "../../domain/user";
import {Product} from "../../domain/product";
import {Order} from "../../domain/order";

export interface cartRepository {
    createCart(newCart: Cart): Promise<Cart>;
    updateCart(cart: Cart) : Promise<Cart>;
    findCartById(id: string): Promise<Cart>;
}