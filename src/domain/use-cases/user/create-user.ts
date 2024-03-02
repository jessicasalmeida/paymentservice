import { userRepository } from '../../interfaces/repositories/user-repository';
import { createUserUseCase } from '../../interfaces/use-cases/create-user-use-case';
import { userRequestModel, userResponseModel } from '../../models/user';

export class createUser implements createUserUseCase{
    userRepository: userRepository
    constructor(userRepository: userRepository){
        this.userRepository = userRepository
    }

    async execute(user: userRequestModel) : Promise<userResponseModel | null>
    {
        return await this.userRepository.createUser(user);
    }
}