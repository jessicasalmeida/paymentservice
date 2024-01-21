import {ObjectId} from "mongodb";

export interface Product {
    _id: ObjectId;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}