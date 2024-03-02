import { CartRequestModel } from "../../models/cart";
import { CartRequestModel as CartResponseModel } from '../../models/cart';

export interface CartUseCase {
    createCart(): Promise<CartResponseModel>;
    addUser(idCart: string, idUser: string) : Promise<CartResponseModel>;
    addProduct(idCart: string, idProduct: string): Promise<CartResponseModel>;
    personalizeItem(idCart: string, idProduct: string, options: Array<string>): Promise<CartResponseModel>;
    resumeCart(id: string): Promise<CartResponseModel>;
    closeCart(id: string): Promise<CartResponseModel>;
    payCart(id: string): Promise<CartResponseModel>;
    sendToKitchen(id: string): Promise<boolean>;
    cancelCart(id: string): Promise<CartResponseModel>;
    findOne(id: string): Promise<CartResponseModel>;
}