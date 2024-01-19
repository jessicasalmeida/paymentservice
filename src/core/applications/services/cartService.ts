import {CartRepository} from "../ports/cartRepository";
import {Cart} from "../../domain/cart";
import {Order} from "../../domain/order";
import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";

export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async createCart(): Promise<Cart> {
        const emptyUser = {} as User;
        const emptyProdutos =  [] as Produto[];
        const newCart: Cart = {
            id: "0",
            user: emptyUser,
            produtosList: emptyProdutos,
            valorTotal: 0,
            status: "OPEN",
            pago: false
        }
        return this.cartRepository.createCart(newCart);
    }
    async addUser(idCart: string, idUser: string): Promise<Cart> {
        return this.cartRepository.addUser(idCart, idUser);
    }
    async addProduct(idCart: string, idProduct: string): Promise<Cart> {
        return this.cartRepository.addProduct(idCart, idProduct);
    }
    async personalizeItens(idCart: string, idProduct: string, observacoes: Array<string>): Promise<Cart> {
        return this.cartRepository.personalizeItens(idCart, idProduct,  observacoes);
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
    async sendToKitchen(id: string): Promise<Cart>{
        return this.cartRepository.sendToKitchen(id);
    }

    async cancelCart(id: string): Promise<Cart>{
        return this.cartRepository.cancelCart(id);
    }


}