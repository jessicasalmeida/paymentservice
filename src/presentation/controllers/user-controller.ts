import { Request, Response } from 'express';
import { createUserUseCase } from '../../domain/interfaces/use-cases/create-user-use-case';
import { getOneUserUseCase } from '../../domain/interfaces/use-cases/get-one-user-use-case';

export class userController {        
        constructor(private readonly createUserUseCase:createUserUseCase,
            private readonly getOneUserUseCase:getOneUserUseCase) { }

    async getUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.getOneUserUseCase.execute(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({message: "Error fetching data. " + error})
        }        
    }
    async createUser(req: Request, res: Response) {
        try {
        const newUser= req.body;
        const user = await this.createUserUseCase.execute(newUser);
        res.status(200).json(user);
        } catch (error) {
            res.status(500).send({message: "Error creating data. " + error})
        }   
    }
}
