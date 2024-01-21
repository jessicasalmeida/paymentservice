import {user} from "./user";
import {Product} from "./product";
import {ObjectId} from "mongodb";

export default interface Cart {
    _id: ObjectId;
    user: user;
    products: Array<Product>;
    totalValue: number;
    status: string;
    payment: boolean;
}