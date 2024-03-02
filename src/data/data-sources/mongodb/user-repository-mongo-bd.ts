import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import UserDataSource from "../../interfaces/data-sources/user-data-source";
import { userRequestModel, userResponseModel } from "../../../domain/models/user";

    export class userRepositoryMongoBd implements UserDataSource{

    async create(user: userRequestModel): Promise<userResponseModel | null> {
        await collections.user?.insertOne(user);
        return user;
    }
    async getOne(id: string): Promise<userResponseModel | null> {
        const query = { _id: new ObjectId(id)};
        const user = await collections.user?.findOne(query);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user as unknown as userResponseModel;
    }
}