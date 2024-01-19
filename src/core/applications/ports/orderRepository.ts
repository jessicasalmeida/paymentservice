import {Order} from "../../domain/order";

export interface OrderRepository {
    receiveOrder(idCart: string): Promise<Order>;
    prepareOrder(idOrder: string) : Promise<Order>;
    estimateDelivery(idOrder: string): Promise<string>;
    sendNotificationEstimatedTime(idOrder: string): Promise<string>;
    sendNotificationDelivery(idOrder: string): Promise<string>;
    updateStatusToReady(idOrder: string) : Promise<Order>;
    updateStatusToDelivered(idOrder: string) : Promise<Order>;
    updateStatusToClosed(idOrder: string) : Promise<Order>;
    getAllActiveOrders(): Promise<Order[]>;
}