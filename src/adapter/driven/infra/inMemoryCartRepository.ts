import {CartRepository} from "../../../core/applications/ports/cartRepository";
import {Cart} from "../../../core/domain/cart";
import {Order} from "../../../core/domain/order";
import {Produto} from "../../../core/domain/produto";
import {User} from "../../../core/domain/user";

export class InMemoryCartRepository implements CartRepository {

    private readonly users: User[] = [{ id: '1', name: 'John Doe', email: 'john.doe@example.com' }];
    private readonly produtos: Produto[] = [
        { id: "1", name: "Big Mac", opcoes: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], categoria: "Lanche", preco: 10, status: true},
        { id: "2", name: "Big Tasty", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], categoria: "Lanche", preco: 10, status: true},
      ];

    private readonly carts: Cart[] = [
        {
            id: "1",
            user: this.users[0],
            produtosList: this.produtos,
            valorTotal: 20,
            status: "",
            pago: true
        },

        {
            id: "2",
            user: {} as User,
            produtosList:  [] as Produto[],
            valorTotal: 0,
            status: "",
            pago: true
        }
    ];

    async createCart(): Promise<Cart> {
        const id = (this.carts.length+1).toString();
        const emptyUser = {} as User;
        const emptyProdutos =  [] as Produto[];

        const newCart: Cart = {
            id: id,
            user: emptyUser,
            produtosList: emptyProdutos,
            valorTotal: 0,
            status: "OPEN",
            pago: false
        }
        this.carts.push(newCart);
        return newCart;
    }

    async addUser(idCart: string, idUser: string): Promise<Cart> {
        const cart = this.findCartById(idCart);
        const index = this.carts.indexOf(cart);
        cart.user = this.findUserById(idUser);
        this.carts[index] = cart;
        return cart;
    }

    async addProduct(idCart: string, idProduct: string): Promise<Cart> {
        const cart = this.findCartById(idCart);
        const index = this.carts.indexOf(cart);
        var newProducts = cart.produtosList;
        newProducts.push(this.findProductById(idProduct));
        let valorTotal = newProducts.reduce((sum, p) => sum + p.preco, 0);

        cart.produtosList = newProducts;
        cart.valorTotal = valorTotal;

        this.carts[index] = cart;
        return cart;

    }

    async personalizeItens(idCart: string, idProduct: string, observacoes: Array<string>): Promise<Cart> {
        const cart = this.findCartById(idCart);
        const index = this.carts.indexOf(cart);

        let product = this.findProductById(idProduct);
        const indexProduct = cart.produtosList.indexOf(product);
        const listProducts = cart.produtosList;
        if(listProducts.length == 0){
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ")
        }
        product.opcoes = observacoes;
        listProducts[indexProduct] = product;

        this.carts[index]=cart;
        return cart;
    }

    async resumeCart(id: string): Promise<Cart> {
        return this.findCartById(id);
    }

    async closeCart(id: string): Promise<Cart> {
        const cart = this.findCartById(id);
        const index = this.carts.indexOf(cart);
        cart.status = "CLOSED"
        this.carts[index]=cart;
        return cart;
    }

    async payCart(id: string): Promise<Cart> {
        const cart = this.findCartById(id);
        const index = this.carts.indexOf(cart);
        cart.pago = true;
        this.carts[index]=cart;
        return cart;
    }

    async sendToKitchen(id: string): Promise<Order> {
        const cart = this.findCartById(id);
        const index = this.carts.indexOf(cart);
        cart.status = "SENDED";
        this.carts[index]=cart;
        return cart;
    }

    private findCartById(id: string) : Cart
    {
        const cart = this.carts.find(u => u.id === id);
        if (!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart;
    }
    private findUserById(id: string) : User
    {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    private findProductById(id: string) : Produto
    {
        const produto = this.produtos.find(u => u.id === id);
        if (!produto) {
            throw new Error(`Product with id ${id} not found`);
        }
        return produto;
    }

    async cancelCart(id: string): Promise<Cart> {
        const cart = this.findCartById(id);
        const index = this.carts.indexOf(cart);
        cart.status = "CANCELLED";
        this.carts[index]=cart;
        return cart;
    }


}