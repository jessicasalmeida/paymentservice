import { userRepository } from "../interfaces/repositories/user-repository";
import {userResponseModel} from "../models/user";
import userDataSource from "../../data/interfaces/data-sources/user-data-source";

export default class userRepositoryImpl implements userRepository{
    userDataSource : userDataSource
    constructor(userDataSource: userDataSource)
    {
        this.userDataSource = userDataSource;
    }
    async getUserById(id: string): Promise<userResponseModel | null> {
        return this.userDataSource.getOne(id); 
    }
    async createUser(newUser: userResponseModel): Promise<userResponseModel| null> {
        return this.userDataSource.create(newUser);
    }

}