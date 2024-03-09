import { error } from "console";
import express, { Router } from "express";
import { userController } from "../../../operation/controllers/user-controller";
import { userRepositoryMongoBd } from "../../data-sources/mongodb/user-repository-mongo-bd";
import { NewUserDTO } from "../../../common/dtos/user.dto";


const userRepository = new userRepositoryMongoBd();

export const userRouter = Router();

userRouter.use(express.json());

userRouter.get('/:id', async (req, res) => {
    const user = await userController.getUserById(req.params.id, userRepository);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(500).send({ message: "Error fetching data. " + error })
    }
});

userRouter.post('/', async (req, res) => {
    if (!req.body) {
        res.status(500).send();
    }
    const newUser: NewUserDTO = {
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
    };
    const user = await userController.createUser(newUser, userRepository);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(500).send({ message: "Error creating data. " + error });
    }
});