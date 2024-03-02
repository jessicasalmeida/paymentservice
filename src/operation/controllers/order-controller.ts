import {Request, Response} from "express";
import { OrderUseCase } from '../../domain/interfaces/use-cases/order-use-case';

export class OrderController {
    constructor(private readonly orderUseCase: OrderUseCase) {
    }

    async receiveOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.receiveOrder(id);
        res.status(200).json(order);
    }

    async prepareOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.prepareOrder(id);
        res.status(200).json(order);
    }

    async estimateDelivery(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.estimateDelivery(id);
        res.status(200).json(order);
    }

    async updateStatusToReady(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.updateStatusToReady(id);
        res.status(200).json(order);
    }

    async updateStatusToDelivered(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.updateStatusToDelivered(id);
        res.status(200).json(order);
    }

    async updateStatusToClosed(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.updateStatusToClosed(id);
        res.status(200).json(order);
    }

    async getAllActiveOrders(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderUseCase.getAllActiveOrders();
        res.status(200).json(order);
    }
}