import {user} from "../../domain/user";
import {Product} from "../../domain/product";

export interface userRepository {
    getUserById(id: string): Promise<user>;

}