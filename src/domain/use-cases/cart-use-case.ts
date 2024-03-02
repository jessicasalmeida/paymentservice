import { CartRepository } from '../interfaces/repositories/cart-repository';
import { CartUseCase } from '../interfaces/use-cases/cart-use-case';
import { CartRequestModel } from '../models/cart';
import { CartRequestModel as CartResponseModel } from '../models/cart';
import { ProductResponseModel } from '../models/product';
import { userResponseModel } from '../models/user';
import { userRepository } from '../interfaces/repositories/user-repository';
import { ProductRepository } from '../interfaces/repositories/product-repository';

export class CartUseCaseImpl implements CartUseCase{
    cartRepository: CartRepository
    userRepository:userRepository
    productRepository: ProductRepository
    constructor(cartRepository: CartRepository, userRepository:userRepository,  productRepository: ProductRepository){
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    async createCart(): Promise<CartResponseModel> {
        const newCart: CartRequestModel = {
            user: {} as userResponseModel,
            products: [] as ProductResponseModel[],
            totalValue: 0,
            status: "OPEN",
            payment: false
        }
        return this.cartRepository.create(newCart);
    }
    async addUser(idCart: string, idUser: string): Promise<CartResponseModel> {
        const cart = await this.cartRepository.getOne(idCart);
        try {
            cart.user = await this.userRepository.getUserById(idUser)as unknown as userResponseModel;
        } catch (error) {
            throw new Error("Não foi possivel add o user no cart: Usuário: " + idUser );
        }        
        return this.cartRepository.update(idCart, cart);
    }
    
    async addProduct(idCart: string, idProduct: string): Promise<CartResponseModel> {
        const cart = await this.cartRepository.getOne(idCart);
        let product =  Object.assign({},await this.productRepository.findProductById(idProduct));
        product.price = this.calculateProductPrice(cart.products, product);
        const newProducts = cart.products;
        newProducts.push(product);
        let valorTotal = this.calculateTotalValue(newProducts);
        cart.products = newProducts;
        cart.totalValue = valorTotal;
        return this.cartRepository.update(idCart, cart);
    }

    async personalizeItem(idCart: string, idProduct: string, options: Array<string>): Promise<CartResponseModel> {
        const cart = await this.cartRepository.getOne(idCart);
        let listProducts = cart.products;
        let products = listProducts.find((u) => {
            return u._id == idProduct;
        });

        if(!products){
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ")
        }
        const indexProduct = listProducts.indexOf(products);
        products.options = options;
        listProducts[indexProduct] = products;
        cart.products = listProducts;
        return this.cartRepository.update(idCart, cart);
    }
    async resumeCart(id: string): Promise<CartResponseModel> {
        return this.cartRepository.getOne(id);
    }
    async closeCart(id: string): Promise<CartResponseModel> {
        const cart = await this.cartRepository.getOne(id);
        cart.status = "CLOSED"
        return this.cartRepository.update(id, cart);
    }
    async payCart(id: string): Promise<CartResponseModel>{
        const cart = await this.cartRepository.getOne(id);
        cart.payment = true;
        return this.cartRepository.update(id, cart);
    }
    async sendToKitchen(id: string): Promise<boolean>{
        const cart = await this.cartRepository.getOne(id);
        if(cart.payment) {
            cart.status = "SENDED"
            await this.cartRepository.update(id, cart);
            return  true;
        }
        else
        {
            return false;
        }
    }

    async cancelCart(id: string): Promise<CartResponseModel>{
        const cart = await this.cartRepository.getOne(id);
        cart.status = "CANCELLED"
        return this.cartRepository.update(id, cart);
    }

    async findOne(id: string): Promise<CartRequestModel> {
      return this.cartRepository.getOne(id);   
    }

    private calculateTotalValue(productsList: ProductResponseModel[]): number{
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }

    private calculateProductPrice(productsList: ProductResponseModel[], product: ProductResponseModel): number
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
}