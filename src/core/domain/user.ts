import {ObjectId} from "mongodb";

export default interface user {
    _id: ObjectId;
    name: string;
    email: string;
}