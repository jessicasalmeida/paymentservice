import {ObjectId} from "mongodb";

export default interface user {
    _id: ObjectId;
    cpf: string;
    name: string;
    email: string;
}