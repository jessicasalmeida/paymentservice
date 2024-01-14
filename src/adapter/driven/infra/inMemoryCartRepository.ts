import {CartRepository} from "../../../core/applications/ports/cartRepository";
import {Cart} from "../../../core/domain/cart";
import {Order} from "../../../core/domain/order";
import {Produto} from "../../../core/domain/produto";
import {User} from "../../../core/domain/user";

export class InMemoryCartRepository implements CartRepository {

    private readonly user: User = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    private readonly produtos: Produto[] = [
        { id: "1", name: "Big Mac", opcoes: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], categoria: "Lanche", preco: "10", status: true},
        { id: "2", name: "Big Tasty", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], categoria: "Lanche", preco: "10", status: true},
      ];

    private readonly cart: Cart[] = [
        {
            id: "1",
            user: this.user,
            produtosList: this.produtos,
            observacoes: ``,
            valorTotal: 100,
            status: "",
            pago: true
        }
    ];

    async createCart(): Promise<Cart> {
        return this.cart[0];
    }

    async addUser(idCart: string, idUser: string): Promise<Cart> {
        return this.cart[0];
    }

    async addProduct(idCart: string, idUser: string): Promise<Cart> {
        return this.cart[0];
    }

    async personalizeItens(idCart: string, idUser: string): Promise<Cart> {
        return this.cart[0];
    }

    async resumeCart(id: string): Promise<Cart> {
        return this.cart[0];
    }

    async closeCart(id: string): Promise<Cart> {
        return this.cart[0];
    }

    async payCart(id: string): Promise<Cart> {
        return this.cart[0];
    }

    async sendToKitchen(id: string): Promise<Order> {
        return this.cart[0];
    }


}