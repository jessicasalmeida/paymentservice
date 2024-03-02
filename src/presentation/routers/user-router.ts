import express, {Router} from "express";
import {userController} from "../controllers/user-controller";
import { userRepositoryMongoBd } from "../../data/data-sources/mongodb/user-repository-mongo-bd";
import userRepositoryImpl from "../../domain/repositories/UserRepositoryImpl";
import { getOneUser } from "../../domain/use-cases/user/get-one-user";
import { createUser } from "../../domain/use-cases/user/create-user";

const userRepository = new userRepositoryMongoBd();
const userC = new userController(
    new createUser(new userRepositoryImpl(userRepository)),
    new getOneUser(new userRepositoryImpl(userRepository)));

export const userRouter = Router();

userRouter.use(express.json());
userRouter.get('/:id', userC.getUserById.bind(userC));
userRouter.post('/', userC.createUser.bind(userC));