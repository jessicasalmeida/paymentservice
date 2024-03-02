import { userRequestModel, userResponseModel } from "../../models/user";

export interface UserUseCase {
    executeCreate(user: userRequestModel): Promise<userResponseModel | null>;
    executeGetOne(id: String): Promise<userResponseModel | null>;
}