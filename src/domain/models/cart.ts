import { ProductResponseModel } from "./product";
import { userResponseModel } from "./user";

export interface CartRequestModel {
    user: userResponseModel;
    products: Array<ProductResponseModel>;
    totalValue: number;
    status: string;
    payment: boolean;
}


export interface CartResponseModel {
    _id?: string;
    user: userResponseModel;
    products: Array<ProductResponseModel>;
    totalValue: number;
    status: string;
    payment: boolean;
}