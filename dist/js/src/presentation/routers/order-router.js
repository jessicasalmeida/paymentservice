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
exports.orderRouter = void 0;
const cart_repository_mongo_bd_1 = require("../../../data/data-sources/mongodb/cart-repository-mongo-bd");
const order_repository_mongo_bd_1 = require("../../driven/infra/order-repository-mongo-bd");
const order_service_1 = require("../../../core/applications/services/order-service");
const order_controller_1 = require("../controllers/order-controller");
const express_1 = __importStar(require("express"));
const cartRepository = new cart_repository_mongo_bd_1.cartRepositoryMongoBd();
const orderRepository = new order_repository_mongo_bd_1.orderRepositoryMongoBd();
const orderS = new order_service_1.orderService(orderRepository, cartRepository);
const orderC = new order_controller_1.orderController(orderS);
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(express_1.default.json());
exports.orderRouter.post('/receive/:id', orderC.receiveOrder.bind(orderC));
exports.orderRouter.post('/prepare/:id', orderC.prepareOrder.bind(orderC));
exports.orderRouter.get('/estimate/:id', orderC.estimateDelivery.bind(orderC));
exports.orderRouter.post('/update/ready/:id', orderC.updateStatusToReady.bind(orderC));
exports.orderRouter.post('/update/delivered/:id', orderC.updateStatusToDelivered.bind(orderC));
exports.orderRouter.post('/update/closed/:id', orderC.updateStatusToClosed.bind(orderC));
exports.orderRouter.get('/', orderC.getAllActiveOrders.bind(orderC));
