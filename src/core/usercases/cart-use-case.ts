import { CartRepository } from '../../domain/interfaces/repositories/cart-repository';
import { CartUseCase } from '../../domain/interfaces/use-cases/cart-use-case';
import { NewCartDTO } from '../../common/dtos/cart.dto';
import { NewCartDTO as CartResponseModel } from '../../common/dtos/cart.dto';
import { ProductResponseModel } from '../models/product';
import { userResponseModel } from '../models/user';
import { userRepository } from '../../domain/interfaces/repositories/user-repository';
import { ProductRepository } from '../../domain/interfaces/repositories/product-repository';
import { UserEntity } from '../entities/user';
import { CartEntity } from '../entities/cart';
import { ProductEntity } from '../entities/product';

export class CartUseCaseImpl {

    static createCart(
        user: UserEntity,
        products: Array<ProductEntity>,
        totalValue: number,
        status: string,
        payment: boolean,
        ): Promise<CartEntity> 
        {
        const newCart: CartEntity = new CartEntity(
            "",
            {} as UserEntity,
            [] as ProductEntity[],
            0,
            "OPEN",
            false);
            // gateway
            return newCart;

        }
        
    }
    static async addUser(user: UserEntity, idCart: string, idUser: string): Promise<CartResponseModel> {
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

    static async personalizeItem(idCart: string, idProduct: string, options: Array<string>): Promise<CartResponseModel> {
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
    static async resumeCart(id: string): Promise<CartResponseModel> {
        return this.cartRepository.getOne(id);
    }
    static async closeCart(id: string): Promise<CartResponseModel> {
        const cart = await this.cartRepository.getOne(id);
        cart.status = "CLOSED"
        return this.cartRepository.update(id, cart);
    }
    static async payCart(id: string): Promise<CartResponseModel>{
        const cart = await this.cartRepository.getOne(id);
        cart.payment = true;
        return this.cartRepository.update(id, cart);
    }
    static async sendToKitchen(id: string): Promise<boolean>{
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

    static async cancelCart(id: string): Promise<CartResponseModel>{
        const cart = await this.cartRepository.getOne(id);
        cart.status = "CANCELLED"
        return this.cartRepository.update(id, cart);
    }

    static async findOne(id: string): Promise<NewCartDTO> {
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