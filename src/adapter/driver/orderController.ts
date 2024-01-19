import {OrderService} from "../../core/applications/services/orderService";
import {Request, Response} from "express";

export class OrderController {
    constructor(private readonly orderService: OrderService) {
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

    async sendNotification(req: Request, res: Response) {
        const id = req.params.id;
        const order = await this.orderService.sendNotification(id);
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
}