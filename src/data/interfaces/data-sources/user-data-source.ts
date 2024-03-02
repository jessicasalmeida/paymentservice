import { userRequestModel } from "../../../domain/models/user";
import { userResponseModel } from "../../../domain/models/user";

export default interface UserDataSource {
    create(user: userRequestModel): Promise<userResponseModel | null>;
    getOne(id: string): Promise<userResponseModel | null>;
}