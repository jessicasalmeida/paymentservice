import { Request, Response } from 'express';
import {UserService} from "../../core/applications/services/user-service";

export class userController {
    constructor(private readonly userService: UserService) { }


    async getUserById(req: Request, res: Response) {
        const id = req.params.id;
        const user = await this.userService.getUserById(id);
        res.status(200).json(user);
    }
    async createUser(req: Request, res: Response) {
        const newUser= req.body;
        const user = await this.userService.createUser(newUser);
        res.status(200).json(user);
    }
}
