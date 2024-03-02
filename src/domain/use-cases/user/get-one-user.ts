import { userRepository } from '../../interfaces/repositories/user-repository';
import { getOneUserUseCase } from '../../interfaces/use-cases/get-one-user-use-case';
import { userRequestModel, userResponseModel } from '../../models/user';

export class getOneUser implements getOneUserUseCase{
    userRepository: userRepository
    constructor(userRepository: userRepository){
        this.userRepository = userRepository
    }

    async execute(id: string) : Promise<userResponseModel | null>
    {
        return await this.userRepository.getUserById(id);
    }
}