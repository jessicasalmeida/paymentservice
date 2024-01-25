import express, {Router} from "express";
import {userRepositoryMongoBd} from "../../driven/infra/user-repository-mongo-bd";
import {userController} from "../controllers/user-controller";
import {UserService} from "../../../core/applications/services/user-service";

const userRepository = new userRepositoryMongoBd();
const userS= new UserService(userRepository);
const userC = new userController(userS);
export const userRouter = Router();

userRouter.use(express.json());
userRouter.get('/:id', userC.getUserById.bind(userC));
userRouter.post('/', userC.createUser.bind(userC));