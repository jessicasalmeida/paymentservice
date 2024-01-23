import {ObjectId} from "mongodb";

export default interface product {
    _id: ObjectId;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}