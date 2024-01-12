import {UserRepository} from "../ports/userRepository";
import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(id: string): Promise<User> {
        return this.userRepository.getUserById(id);
    }
    async getProductByCategory(id: string): Promise<Produto> {
        return this.userRepository.getProductByCategory(id);
    }
    async getProductById(id: string): Promise<Produto> {
        return this.userRepository.getProductById(id);
    }
}