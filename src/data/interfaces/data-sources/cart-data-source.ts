import { CartRequestModel } from '../../../domain/models/cart';
import { CartRequestModel as CartResponseModel } from '../../../domain/models/cart';

export interface CartDataSource{
    create(newCart: CartRequestModel): Promise<CartResponseModel>;
    update(id: string, cart: CartRequestModel) : Promise<CartResponseModel>;
    getOne(id: string): Promise<CartResponseModel>;
}