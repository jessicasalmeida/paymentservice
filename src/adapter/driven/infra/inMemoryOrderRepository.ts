import {OrderRepository} from "../../../core/applications/ports/orderRepository";
import {Order} from "../../../core/domain/order";

export class InMemoryOrderRepository implements OrderRepository {
    estimateDelivery(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    prepareOrder(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    receiveOrder(idCart: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    sendNotification(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    updateStatusToClosed(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    updateStatusToDelivered(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    updateStatusToReady(idOrder: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

}