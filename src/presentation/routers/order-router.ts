import {cartRepositoryMongoBd} from "../../../data/data-sources/mongodb/cart-repository-mongo-bd";
import {orderRepositoryMongoBd} from "../../driven/infra/order-repository-mongo-bd";
import {orderService} from "../../../core/applications/services/order-service";
import {orderController} from "../controllers/order-controller";
import express, {Router} from "express";

const cartRepository = new cartRepositoryMongoBd();
const orderRepository = new orderRepositoryMongoBd();

const orderS = new orderService(orderRepository, cartRepository);

const orderC = new orderController(orderS);
export const orderRouter = Router();

orderRouter.use(express.json());
orderRouter.post('/receive/:id', orderC.receiveOrder.bind(orderC));
orderRouter.post('/prepare/:id', orderC.prepareOrder.bind(orderC));
orderRouter.get('/estimate/:id', orderC.estimateDelivery.bind(orderC));
orderRouter.post('/update/ready/:id', orderC.updateStatusToReady.bind(orderC));
orderRouter.post('/update/delivered/:id', orderC.updateStatusToDelivered.bind(orderC));
orderRouter.post('/update/closed/:id', orderC.updateStatusToClosed.bind(orderC));
orderRouter.get('/', orderC.getAllActiveOrders.bind(orderC));