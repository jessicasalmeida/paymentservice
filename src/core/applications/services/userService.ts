import {UserRepository} from "../ports/userRepository";
import {User} from "../../domain/user";

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(id: string): Promise<User> {
        return this.userRepository.getUserById(id);
    }

}