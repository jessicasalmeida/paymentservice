import userResponseModel from "./user";
import product from "./product";

export default interface cart {
    _id?: string;
    user: userResponseModel;
    products: Array<product>;
    totalValue: number;
    status: string;
    payment: boolean;
}