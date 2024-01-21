import {orderService} from "../../core/applications/services/order-service";
import {Request, Response} from "express";

export class orderController {
    constructor(private readonly orderService: orderService) {
    }

    async receiveOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.receiveOrder(id);
        res.status(200).json(order);
    }

    async prepareOrder(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.prepareOrder(id);
        res.status(200).json(order);
    }

    async estimateDelivery(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.estimateDelivery(id);
        res.status(200).json(order);
    }

    async updateStatusToReady(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.updateStatusToReady(id);
        res.status(200).json(order);
    }

    async updateStatusToDelivered(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.updateStatusToDelivered(id);
        res.status(200).json(order);
    }

    async updateStatusToClosed(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.updateStatusToClosed(id);
        res.status(200).json(order);
    }

    async getAllActiveOrders(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.getAllActiveOrders();
        res.status(200).json(order);
    }
}