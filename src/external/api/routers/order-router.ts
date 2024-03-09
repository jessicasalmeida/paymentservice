import { OrderRepositoryImpl } from "../../domain/repositories/order-repository";
import express, {Router} from "express";
import { OrderRepositoryMongoBd } from '../../data/data-sources/mongodb/order-repository-mongo-bd';
import { OrderUseCaseImpl } from "../../domain/use-cases/order-use-case";
import CartRepositoryImpl from "../../domain/repositories/cart-repository";
import { CartRepositoryMongoBd } from "../../data/data-sources/mongodb/cart-repository-mongo-bd";
import { OrderController } from "../../operation/controllers/order-controller";
import { CartGateway } from '../../../operation/gateways/cart';
import { OrderGateway } from '../../../operation/gateways/order';

const cartRepository = new CartRepositoryMongoBd();
const orderRepository = new OrderRepositoryMongoBd();

const CartGateway = new CartGateway(cartRepository);
const OrderGateway = new OrderGateway(orderRepository);

export const orderRouter = Router();

orderRouter.use(express.json());
orderRouter.post('/receive/:id', orderC.receiveOrder.bind(orderC));
orderRouter.post('/prepare/:id', orderC.prepareOrder.bind(orderC));
orderRouter.get('/estimate/:id', orderC.estimateDelivery.bind(orderC));
orderRouter.post('/update/ready/:id', orderC.updateStatusToReady.bind(orderC));
orderRouter.post('/update/delivered/:id', orderC.updateStatusToDelivered.bind(orderC));
orderRouter.post('/update/closed/:id', orderC.updateStatusToClosed.bind(orderC));
orderRouter.get('/', orderC.getAllActiveOrders.bind(orderC));