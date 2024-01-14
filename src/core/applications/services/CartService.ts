import {CartRepository} from "../ports/cartRepository";
import {Cart} from "../../domain/cart";
import {Order} from "../../domain/order";

export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async createCart(): Promise<Cart> {
        return this.cartRepository.createCart();
    }
    async addUser(idCart: string, idUser: string): Promise<Cart> {
        return this.cartRepository.addUser(idCart, idUser);
    }
    async addProduct(idCart: string, idProduct: string): Promise<Cart> {
        return this.cartRepository.addProduct(idCart, idProduct);
    }
    async personalizeItens(idCart: string, observacoes: String): Promise<Cart> {
        return this.cartRepository.personalizeItens(idCart, observacoes);
    }
    async resumeCart(id: string): Promise<Cart> {
        return this.cartRepository.resumeCart(id);
    }
    async closeCart(id: string): Promise<Cart> {
        return this.cartRepository.closeCart(id);
    }
    async payCart(id: string): Promise<Cart>{
        return this.cartRepository.payCart(id);
    }
    async sendToKitchen(id: string): Promise<Order>{
        return this.cartRepository.sendToKitchen(id);
    }


}