"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importStar(require("express"));
const product_repository_mongo_bd_1 = require("../../data-sources/mongodb/product-repository-mongo-bd");
const order_repository_mongo_bd_1 = require("../../data-sources/mongodb/order-repository-mongo-bd");
const cart_repository_mongo_bd_1 = require("../../data-sources/mongodb/cart-repository-mongo-bd");
const product_controller_1 = require("../../../operation/controllers/product-controller");
const productRepository = new product_repository_mongo_bd_1.ProductRepositoryMongoBd();
const orderRepository = new order_repository_mongo_bd_1.OrderRepositoryMongoBd();
const cartRepository = new cart_repository_mongo_bd_1.CartRepositoryMongoBd();
exports.productRouter = (0, express_1.Router)();
exports.productRouter.use(express_1.default.json());
exports.productRouter.get('/categoria/:categoria', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'GetCategoria'
        #swagger.description = 'Endpoint to get the list of specific product on category. Ex: Lanche, Combo, Sobremesa, Bebida*/
    const categoria = req.params.categoria;
    const produto = yield product_controller_1.ProductController.getProductByCategory(categoria, productRepository);
    res.status(200).json(produto);
}));
exports.productRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'GetID'
            #swagger.description = 'Endpoint to get the specific product.' */
    const id = req.params.id;
    const product = yield product_controller_1.ProductController.getProductById(id, productRepository);
    res.status(200).json(product);
}));
exports.productRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
            #swagger.description = 'Endpoint to add a product'
            #swagger.summary = 'Create'*/
    /*#swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/product"
            }
        }
    }
}
*/
    const newProduct = req.body;
    const product = yield product_controller_1.ProductController.createProduct(newProduct, productRepository);
    res.status(200).json(product);
}));
exports.productRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Delete'
        #swagger.description = 'Endpoint to delete a product' */
    const id = req.params.id;
    const product = yield product_controller_1.ProductController.deleteProductById(id, productRepository, orderRepository, cartRepository);
    if (product) {
        res.status(200).json("Produto deletado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser deletado");
    }
}));
exports.productRouter.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Update'
        #swagger.description = 'Endpoint to update a product' */
    /*#swagger.requestBody = {
   required: true,
   content: {
       "application/json": {
           schema: {
               $ref: "#/components/schemas/product"
           }
       }
   }
}
*/
    const id = req.params.id;
    const newProduct = req.body;
    const product = yield product_controller_1.ProductController.updateProductById(id, newProduct, productRepository);
    res.status(200).json(product);
}));
exports.productRouter.post('/deactive/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Deactive'
        #swagger.description = 'Endpoint to deactive a product' */
    const id = req.params.id;
    const product = yield product_controller_1.ProductController.deactivateProductById(id, productRepository, orderRepository, cartRepository);
    if (product) {
        res.status(200).json("Produto desativado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser desativado");
    }
}));
exports.productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Product']
       #swagger.summary = 'GetAll'
       #swagger.description = 'Endpoint to get  all products' */
    const product = yield product_controller_1.ProductController.getAllProducts(productRepository);
    res.status(200).json(product);
}));
