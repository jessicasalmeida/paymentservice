import {userResponseModel} from "../../models/user";

export interface userRepository {
    getUserById(id: string): Promise<userResponseModel | null>;
    createUser(newUser: userResponseModel): Promise<userResponseModel | null>;
}