import express from "express";
import { UserController } from "./userController";
import { InMemoryUserRepository } from "../driven/infra/inMemoryUserRepository";
import { UserService } from "../../core/applications/services/userService"

const userRepository = new InMemoryUserRepository();
const userService= new UserService(userRepository);
const userController = new UserController(userService);

const app = express();
app.get('/users/:id', userController.getUserById.bind(userController));

app.get('/categoria/:categoria', userController.getProductByCategory.bind(userController));

app.get('/produto/:id', userController.getProductById.bind(userController));
app.listen(3000, () => console.log('Server is listening on port 3000'));