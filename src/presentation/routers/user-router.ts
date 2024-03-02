import express, {Router} from "express";
import {userController} from "../../operation/controllers/user-controller";
import { userRepositoryMongoBd } from "../../data/data-sources/mongodb/user-repository-mongo-bd";
import userRepositoryImpl from "../../domain/repositories/user-repository";
import { UserUseCaseImpl } from "../../domain/use-cases/user-use-case";

const userRepository = new userRepositoryMongoBd();
const userC = new userController(
    new UserUseCaseImpl(new userRepositoryImpl(userRepository)));

export const userRouter = Router();

userRouter.use(express.json());
userRouter.get('/:id', userC.getUserById.bind(userC));
userRouter.post('/', userC.createUser.bind(userC));