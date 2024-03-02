import {userRequestModel, userResponseModel} from "../../models/user";

export interface createUserUseCase {
    execute(user: userRequestModel): Promise<userResponseModel | null>;
}