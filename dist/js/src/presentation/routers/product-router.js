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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importStar(require("express"));
const product_repository_bd_1 = require("../../driven/infra/product-repository-bd");
const cart_repository_mongo_bd_1 = require("../../../data/data-sources/mongodb/cart-repository-mongo-bd");
const order_repository_mongo_bd_1 = require("../../driven/infra/order-repository-mongo-bd");
const product_service_1 = require("../../../core/applications/services/product-service");
const product_controller_1 = require("../controllers/product-controller");
const productRepository = new product_repository_bd_1.productRepositoryBd();
const cartRepository = new cart_repository_mongo_bd_1.cartRepositoryMongoBd();
const orderRepository = new order_repository_mongo_bd_1.orderRepositoryMongoBd();
const productS = new product_service_1.productService(productRepository, orderRepository, cartRepository);
const productC = new product_controller_1.productController(productS);
exports.productRouter = (0, express_1.Router)();
exports.productRouter.use(express_1.default.json());
exports.productRouter.get('/categoria/:categoria', productC.getProductByCategory.bind(productC));
exports.productRouter.get('/:id', productC.getProductById.bind(productC));
/*
           #swagger.tags = ['Products']
           #swagger.summary = 'Returns a product by id'
           #swagger.description = 'This endpoint will return a product by id'
       */
exports.productRouter.post('/', productC.createProduct.bind(productC));
exports.productRouter.delete('/:id', productC.deleteProductById.bind(productC));
exports.productRouter.post('/:id', productC.updateProductById.bind(productC));
exports.productRouter.post('/deactive/:id', productC.deactivateProductById.bind(productC));
exports.productRouter.get('/', productC.getAllProducts.bind(productC));
