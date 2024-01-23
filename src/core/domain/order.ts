import {ObjectId} from "mongodb";

export default interface order {
    _id: ObjectId;
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
}