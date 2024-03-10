import { OrderUseCase } from "../../core/usercases/order-use-case";
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartGateway } from '../gateways/cart';
import { OrderGateway } from '../gateways/order';
import { OrderDataSource } from '../../common/interfaces/order-data-source';
import { OrderPresenter } from "../presenters/order";

export class OrderController {
    constructor(private readonly orderUseCase: OrderUseCase) {
    }

    static async receiveOrder(id: string, orderDataSource: OrderDataSource, cartDataSource: CartDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        const cartGateway = new CartGateway(cartDataSource);
        if (!orderGateway || !cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.receiveOrder(id, orderGateway, cartGateway);
        if(order)
        {
            return OrderPresenter.toDTO(order);
        }
        return null;
    }

    static async prepareOrder(id: string, orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.prepareOrder(id, orderGateway);
        if(order)
        {
            return OrderPresenter.toDTO(order);
        }
        return null;
    }

    static async estimateDelivery(id: string, orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.estimateDelivery(id, orderGateway);
        if(order)
        {
            return order;
        }
        return null;
    }

    static async updateStatusToReady(id: string, orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.updateStatusToReady(id, orderGateway);
        if(order)
        {
            return order;
        }
        return null;
    }

    static async updateStatusToDelivered(id: string, orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.updateStatusToDelivered(id, orderGateway);
        if(order)
        {
            return order;
        }
        return null;
    }

    static async updateStatusToClosed(id: string, orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.updateStatusToClosed(id, orderGateway);
        if(order)
        {
            return order;
        }
        return null;
    }

    static async getAllActiveOrders(orderDataSource: OrderDataSource) {
        const orderGateway = new OrderGateway(orderDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await OrderUseCase.getAllActiveOrders(orderGateway);
        if(order)
        {
            return order;
        }
        return null;
    }
}