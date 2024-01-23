import {userRepository} from "../ports/user-repository";
import user from "../../domain/user";

export class UserService {
    constructor(private readonly userRepository: userRepository) { }

    async getUserById(id: string): Promise<user> {
        return this.userRepository.getUserById(id);
    }
    async createUser(newUser: user): Promise<user> {
        return this.userRepository.createUser(newUser);
    }

}