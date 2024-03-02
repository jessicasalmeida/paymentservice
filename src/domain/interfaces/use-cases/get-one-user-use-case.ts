import {userResponseModel} from "../../models/user";

export interface getOneUserUseCase {
    execute(id: String): Promise<userResponseModel | null>;
}