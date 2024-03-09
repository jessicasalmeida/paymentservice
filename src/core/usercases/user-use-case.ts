import { UserGateway } from '../../operation/gateways/user';
import { UserEntity } from "../entities/user";
import { generateRandomString } from '../../common/helpers/generators';

export class UserUseCase{

    static executeCreate(name: string, cpf: string, email: string, userGateway: UserGateway) : Promise<UserEntity | null>
    {
        const novoId = generateRandomString();
        const newUser = new UserEntity(
            novoId,
            cpf,
            name,
            email
        )
        return userGateway.createUser(newUser);
    }
    
    static async executeGetOne(id: string, userGateway: UserGateway) : Promise<UserEntity | null>
    {
        return await userGateway.getUserById(id);
    }
}