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
exports.cartRouter = void 0;
const express_1 = __importStar(require("express"));
const cart_service_1 = require("../../../core/applications/services/cart-service");
const cart_controller_1 = require("../controllers/cart-controller");
const user_repository_mongo_bd_1 = require("../../driven/infra/user-repository-mongo-bd");
const product_repository_bd_1 = require("../../driven/infra/product-repository-bd");
const cart_repository_mongo_bd_1 = require("../../driven/infra/cart-repository-mongo-bd");
const userRepository = new user_repository_mongo_bd_1.userRepositoryMongoBd();
const productRepository = new product_repository_bd_1.productRepositoryBd();
const cartRepository = new cart_repository_mongo_bd_1.cartRepositoryMongoBd();
const cartS = new cart_service_1.cartService(cartRepository, productRepository, userRepository);
const cartC = new cart_controller_1.cartController(cartS);
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.use(express_1.default.json());
exports.cartRouter.post('/', cartC.createCart.bind(cartC));
exports.cartRouter.post('/user/:id', cartC.addUser.bind(cartC));
exports.cartRouter.post('/product/:id', cartC.addProduct.bind(cartC));
exports.cartRouter.post('/itens/:id', cartC.personalizeItens.bind(cartC));
exports.cartRouter.get('/:id', cartC.resumeCart.bind(cartC));
exports.cartRouter.post('/close/:id', cartC.closeCart.bind(cartC));
exports.cartRouter.post('/pay/:id', cartC.payCart.bind(cartC));
exports.cartRouter.post('/kitchen/:id', cartC.sendToKitchen.bind(cartC));
exports.cartRouter.post('/cancel/:id', cartC.cancelCart.bind(cartC));
