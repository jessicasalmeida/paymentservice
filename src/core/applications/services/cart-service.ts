/* import {cartRepository} from "../../../domain/interfaces/repositories/cart-repository";
import cart from "../../../domain/models/cart";
import user from "../../domain/user";
import product from "../../domain/product";
import {productRepository} from "../ports/product-repository";
import {userRepository} from "../ports/user-repository";
import {ObjectId} from "mongodb";

export class cartService {
    constructor(private readonly cartRepository: cartRepository,
                private readonly productRepository: productRepository,
                private userRepository: userRepository) { }

    async createCart(): Promise<cart> {
        const newCart: cart = {
            _id: new ObjectId(),
            user: {} as user,
            products: [] as product[],
            totalValue: 0,
            status: "OPEN",
            payment: false
        }
        return this.cartRepository.createCart(newCart);
    }
    async addUser(idCart: string, idUser: string): Promise<cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        cart.user = await this.userRepository.getUserById(idUser);
        return this.cartRepository.updateCart(cart);
    }
    async addProduct(idCart: string, idProduct: string): Promise<cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        let product =  Object.assign({},await this.productRepository.findProductById(idProduct));
        product.price = this.calculateProductPrice(cart.products, product);
        const newProducts = cart.products;
        newProducts.push(product);
        let valorTotal = this.calculateTotalValue(newProducts);
        cart.products = newProducts;
        cart.totalValue = valorTotal;
        return this.cartRepository.updateCart(cart);
    }

    async personalizeItem(idCart: string, idProduct: string, options: Array<string>): Promise<cart> {
        const cart = await this.cartRepository.findCartById(idCart);
        let listProducts = cart.products;
        let products = listProducts.find((u) => {
            return u._id.equals(new ObjectId(idProduct) );
        });


        if(!products){
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ")
        }
        const indexProduct = listProducts.indexOf(products);
        products.options = options;
        listProducts[indexProduct] = products;
        cart.products = listProducts;
        return this.cartRepository.updateCart(cart);
    }
    async resumeCart(id: string): Promise<cart> {
        return this.cartRepository.findCartById(id);
    }
    async closeCart(id: string): Promise<cart> {
        const cart = await this.cartRepository.findCartById(id);
        cart.status = "CLOSED"
        return this.cartRepository.updateCart(cart);
    }
    async payCart(id: string): Promise<cart>{
        const cart = await this.cartRepository.findCartById(id);
        cart.payment = true;
        return this.cartRepository.updateCart(cart);
    }
    async sendToKitchen(id: string): Promise<boolean>{
        const cart = await this.cartRepository.findCartById(id);
        if(cart.payment) {
            cart.status = "SENDED"
            await this.cartRepository.updateCart(cart);
            return  true;
        }
        else
        {
            return false;
        }
    }

    async cancelCart(id: string): Promise<cart>{
        const cart = await this.cartRepository.findCartById(id);
        cart.status = "CANCELLED"
        return this.cartRepository.updateCart(cart);
    }
    private calculateTotalValue(productsList: product[]): number{
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }

    private calculateProductPrice(productsList: product[], product: product): number
    {
        let qtdCombos = productsList.filter(value => value.category == "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;

        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento)
        {
            return 0;
        }
        return  product.price;
    }
} */