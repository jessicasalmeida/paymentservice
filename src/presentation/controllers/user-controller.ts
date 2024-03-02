import { Request, Response } from 'express';
import { UserUseCase } from '../../domain/interfaces/use-cases/user-use-case';

export class userController {        
        constructor(private readonly userUseCase:UserUseCase) { }

    async getUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userUseCase.executeGetOne(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({message: "Error fetching data. " + error})
        }        
    }
    async createUser(req: Request, res: Response) {
        try {
        const newUser= req.body;
        const user = await this.userUseCase.executeCreate(newUser);
        res.status(200).json(user);
        } catch (error) {
            res.status(500).send({message: "Error creating data. " + error})
        }   
    }
}
