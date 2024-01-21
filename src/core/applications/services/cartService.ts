import {CartRepository} from "../ports/cartRepository";
import {Cart} from "../../domain/cart";
import {User} from "../../domain/user";
import {Product} from "../../domain/product";
import {ProductRepository} from "../ports/productRepository";
import {UserRepository} from "../ports/userRepository";

export class CartService {
    constructor(private readonly cartRepository: CartRepository,
                private readonly productRepository: ProductRepository,
                private userRepository: UserRepository) { }

    async createCart(): Promise<Cart> {
        const newCart: Cart = {
            id: "0",
            user: {} as User,
            products: [] as Product[],
            totalValue: 0,
            status: "OPEN",
            payment: false
        }
        return this.cartRepository.createCart(newCart);
    }
    async addUser(idCart: string, idUser: string): Promise<Cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        cart.user = await this.userRepository.getUserById(idUser);
        return this.cartRepository.updateCart(cart);
    }
    async addProduct(idCart: string, idProduct: string): Promise<Cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        const product = await this.productRepository.findProductById(idProduct);
        const newProducts = cart.products;
        newProducts.push(product);
        let valorTotal = newProducts.reduce((sum, p) => sum + p.price, 0);
        cart.products = newProducts;
        cart.totalValue = valorTotal;
        return this.cartRepository.updateCart(cart);
    }

    async personalizeItem(idCart: string, idProduct: string, options: Array<string>): Promise<Cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        const listProducts = cart.products;
        const products = listProducts.find(u => u.id == idProduct);
        if(!products){
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ")
        }
        const indexProduct = listProducts.indexOf(products);
        products.options = options;
        listProducts[indexProduct] = products;
        cart.products = listProducts;
        return this.cartRepository.updateCart(cart);
    }
    async resumeCart(id: string): Promise<Cart> {
        return this.cartRepository.findCartById(id);
    }
    async closeCart(id: string): Promise<Cart> {
        const cart = await this.cartRepository.findCartById(id);
        cart.status = "CLOSED"
        return this.cartRepository.updateCart(cart);
    }
    async payCart(id: string): Promise<Cart>{
        const cart = await this.cartRepository.findCartById(id);
        cart.payment = true;
        return this.cartRepository.updateCart(cart);
    }
    async sendToKitchen(id: string): Promise<Cart>{
        const cart = await this.cartRepository.findCartById(id);
        cart.status = "SENDED"
        return this.cartRepository.updateCart(cart);
    }

    async cancelCart(id: string): Promise<Cart>{
        const cart = await this.cartRepository.findCartById(id);
        cart.status = "CANCELLED"
        return this.cartRepository.updateCart(cart);
    }
}