import { userRepository } from '../interfaces/repositories/user-repository';
import { UserUseCase } from '../interfaces/use-cases/user-use-case';
import { userRequestModel, userResponseModel } from '../models/user';

export class UserUseCaseImpl implements UserUseCase{
    userRepository: userRepository
    constructor(userRepository: userRepository){
        this.userRepository = userRepository
    }

    async executeCreate(user: userRequestModel) : Promise<userResponseModel | null>
    {
        return await this.userRepository.createUser(user);
    }
    
    async executeGetOne(id: string) : Promise<userResponseModel | null>
    {
        return await this.userRepository.getUserById(id);
    }
}