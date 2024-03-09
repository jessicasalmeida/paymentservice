import UserDataSource from '../../common/interfaces/user-data-source';
import { UserEntity } from '../../core/entities/user';
import { UserDTO } from '../../common/dtos/user.dto';
export class UserGateway
{
    userDataSource: UserDataSource;
    constructor(userDataSource: UserDataSource){
        this.userDataSource = userDataSource;
    }

    async createUser(user: UserEntity):Promise<UserEntity | null>
    {
        const userDTO: UserDTO =
        {
            id: user.id,
            cpf: user.cpf,
            email: user.email,
            name: user.name
        };

        const sucesso = await this.userDataSource.create(userDTO);
        return sucesso;
    }

    async getUserById(id: string): Promise<UserEntity | null>
    {
        const user = await this.userDataSource.getOne(id);
        if(user)
        {
            const userEntity = new UserEntity(
                (id = user.id), user.cpf, user.name, user.email);     
            return user;
        }
        return null;
    }

}