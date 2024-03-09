import { UserDTO } from "../dtos/user.dto";

export default interface UserDataSource {
    create(user: UserDTO): Promise<UserDTO | null>;
    getOne(id: string): Promise<UserDTO | null>;
}