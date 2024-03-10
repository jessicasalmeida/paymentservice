import express, {Router} from "express";
import { CartGateway } from '../../../operation/gateways/cart';
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { OrderRepositoryMongoBd } from "../../data-sources/mongodb/order-repository-mongo-bd";
import { OrderController } from "../../../operation/controllers/order-controller";
import { OrderGateway } from "../../../operation/gateways/order";

const cartRepository = new CartRepositoryMongoBd();
const orderRepository = new OrderRepositoryMongoBd();

const cartGateway = new CartGateway(cartRepository);
const orderGateway = new OrderGateway(orderRepository);

export const orderRouter = Router();

orderRouter.use(express.json());
orderRouter.post('/receive/:id', async (req, res) => {
    const id = req.params.id;
        const order = await OrderController.receiveOrder(id, orderGateway, cartGateway);
        res.status(200).json(order);
    });

orderRouter.post('/prepare/:id', async (req, res) => {
    const id = req.params.id;
        const order = await OrderController.prepareOrder(id, orderGateway);
        res.status(200).json(order);
    });

orderRouter.get('/estimate/:id', async (req, res) => {
      const id = req.params.id;
        const order = await OrderController.estimateDelivery(id, orderGateway);
        res.status(200).json(order);
    });

orderRouter.post('/update/ready/:id', async (req, res) => {
    const id = req.params.id;
        const order = await OrderController.updateStatusToReady(id, orderGateway);
        res.status(200).json(order);
    });

orderRouter.post('/update/delivered/:id', async (req, res) => {
    const id = req.params.id;
        const order = await OrderController.updateStatusToDelivered(id, orderGateway);
        res.status(200).json(order);
    });

orderRouter.post('/update/closed/:id', async (req, res) => {
     const id = req.params.id;
        const order = await OrderController.updateStatusToClosed(id, orderGateway);
        res.status(200).json(order);
    });

orderRouter.get('/', async (req, res) => {
        const order = await OrderController.getAllActiveOrders(orderGateway);
        res.status(200).json(order);
    }); 