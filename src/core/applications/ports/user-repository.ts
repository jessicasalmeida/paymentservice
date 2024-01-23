import user from "../../domain/user";

export interface userRepository {
    getUserById(id: string): Promise<user>;
    createUser(newUser: user): Promise<user>;

}