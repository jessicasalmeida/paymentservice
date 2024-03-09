import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import UserDataSource from "../../../common/interfaces/user-data-source";
import { UserDTO } from "../../../common/dtos/user.dto";

    export class userRepositoryMongoBd implements UserDataSource{

    async create(user: UserDTO): Promise<UserDTO | null> {
        await collections.user?.insertOne(user);
        return user;
    }
    async getOne(id: string): Promise<UserDTO | null> {
        const query = { id: id};
        const user = await collections.user?.findOne(query);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}