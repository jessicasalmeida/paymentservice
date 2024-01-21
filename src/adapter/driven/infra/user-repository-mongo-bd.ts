import {userRepository} from "../../../core/applications/ports/user-repository";
import {user} from "../../../core/domain/user";
import mongoose from "mongoose";
import {Int32} from "mongodb";

export class userRepositoryMongoBd implements userRepository {
    private readonly users: user[] = [
        { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];

    private readonly userSchema= new mongoose.Schema({
        id: {type:String, required:true},
        name: {type:String, required:true},
        email:{type:Array, required:true}
    });

    private readonly users1 = mongoose.model('user', this.userSchema);


    async getUserById(id: string): Promise<user> {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}