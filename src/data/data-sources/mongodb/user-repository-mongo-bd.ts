import {userRepository} from "../../../core/applications/ports/user-repository";
import user from "../../../core/domain/user";
import {ObjectId} from "mongodb";
import {collections} from "./db-connect";

export class userRepositoryMongoBd implements userRepository {

    async getUserById(id: string): Promise<user> {
        const query = { _id: new ObjectId(id)};
        const user = await collections.user?.findOne(query) as user;
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async createUser(newUser: user): Promise<user> {
        await collections.user?.insertOne(newUser);
        return  newUser;
    }
}