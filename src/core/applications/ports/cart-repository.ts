import cart from "../../domain/cart";

export interface cartRepository {
    createCart(newCart: cart): Promise<cart>;
    updateCart(cart: cart) : Promise<cart>;
    findCartById(id: string): Promise<cart>;
}