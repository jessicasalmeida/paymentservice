import express, { Router } from "express";
import { CartGateway } from '../../../operation/gateways/cart';
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { OrderRepositoryMongoBd } from "../../data-sources/mongodb/order-repository-mongo-bd";
import { OrderController } from "../../../operation/controllers/order-controller";
import { OrderGateway } from "../../../operation/gateways/order";

const cartRepository = new CartRepositoryMongoBd();
const orderRepository = new OrderRepositoryMongoBd();

export const orderRouter = Router();

orderRouter.use(express.json());

orderRouter.post('/receive/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.receiveOrder(id, orderRepository, cartRepository);
    res.status(200).json(order);
});

orderRouter.post('/prepare/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.prepareOrder(id, orderRepository);
    res.status(200).json(order);
});

orderRouter.get('/estimate/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.estimateDelivery(id, orderRepository);
    res.status(200).json(order);
});

orderRouter.post('/update/ready/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.updateStatusToReady(id, orderRepository);
    res.status(200).json(order);
});

orderRouter.post('/update/delivered/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.updateStatusToDelivered(id, orderRepository);
    res.status(200).json(order);
});

orderRouter.post('/update/closed/:id', async (req, res) => {
    const id = req.params.id;
    const order = await OrderController.updateStatusToClosed(id, orderRepository);
    res.status(200).json(order);
});

orderRouter.get('/', async (req, res) => {
    const order = await OrderController.getAllActiveOrders(orderRepository);
    res.status(200).json(order);
}); 