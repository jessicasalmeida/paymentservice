import express, {Router} from "express";
import { UserController } from "./userController";
import { InMemoryUserRepository } from "../driven/infra/inMemoryUserRepository";
import { UserService } from "../../core/applications/services/userService"
import {ProductController} from "./productController";
import {InMemoryProductRepository} from "../driven/infra/inMemoryProductRepository";
import {ProductService} from "../../core/applications/services/ProductService";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const userRepository = new InMemoryUserRepository();
const userService= new UserService(userRepository);
const userController = new UserController(userService);

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const app = express();
var bodyParser = require('body-parser');
app.get('/users/:id', userController.getUserById.bind(userController));

app.get('categoria/:categoria', productController.getProductByCategory.bind(productController));

app.get('/produto/:id', productController.getProductById.bind(productController));

app.post('/produto/', productController.createProduct.bind(productController));

app.delete('/produto/:id', productController.deleteProductById.bind(productController));

app.post('/produto/:id', productController.updateProductById.bind(productController));

app.post('/deactive/:id', productController.deactivateProductById.bind(productController));

app.get('/produto/', productController.getActiveProducts.bind(productController));


app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.listen(3000, () => console.log('Server is listening on port 3000'));