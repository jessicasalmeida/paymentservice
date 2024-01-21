import {User} from "../../domain/user";
import {Product} from "../../domain/product";

export interface UserRepository {
    getUserById(id: string): Promise<User>;

}