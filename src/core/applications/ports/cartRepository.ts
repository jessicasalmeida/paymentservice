import {Cart} from "../../domain/cart";
import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";
import {Order} from "../../domain/order";

export interface CartRepository {
    createCart(newCart: Cart): Promise<Cart>;
    addUser(idCart: string, idUser : string) : Promise<Cart>;
    addProduct(idCart: string, idProduct: string): Promise<Cart>;
    personalizeItens(idCart: string, idProduct: string, options: Array<string>): Promise<Cart>;
    resumeCart(id: string) : Promise<Cart>;
    closeCart(id: string) : Promise<Cart>;
    cancelCart(id: string) : Promise<Cart>;
    payCart(id: string): Promise<Cart>;
    sendToKitchen(id: string): Promise<Cart>;
}