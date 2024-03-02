import { CartDataSource } from '../../data/interfaces/data-sources/cart-data-source';
import { CartRepository } from '../interfaces/repositories/cart-repository';
import { CartRequestModel } from '../models/cart';
import { CartRequestModel as CartResponseModel } from '../models/cart';
export default class CartRepositoryImpl implements CartRepository{
    constructor(private readonly cartRepository: CartDataSource) { }

    async create(newCart: CartRequestModel): Promise<CartResponseModel> {
    return await this.cartRepository.create(newCart);
    }

    async update(id: string, cart: CartRequestModel): Promise<CartResponseModel> {
    return await this.cartRepository.update(id, cart);
    }
    
    async getOne(id: string): Promise<CartResponseModel>{
    return await this.cartRepository.getOne(id);
    }
}
