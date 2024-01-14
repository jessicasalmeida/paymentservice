import {User} from "../../domain/user";
import {Produto} from "../../domain/produto";

export interface UserRepository {
    getUserById(id: string): Promise<User>;

}