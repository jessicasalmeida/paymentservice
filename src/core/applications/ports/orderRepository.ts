import {Cart} from "../../domain/cart";
import {Order} from "../../domain/order";

export interface OrderRepository {
    receiveOrder(idCart: string): Promise<Order>;
    prepareOrder(idOrder: string) : Promise<Order>;
    estimateDelivery(idOrder: string): Promise<Order>;
    sendNotification(idOrder: string): Promise<Order>;
    updateStatusToReady(idOrder: string) : Promise<Order>;
    updateStatusToDelivered(idOrder: string) : Promise<Order>;
    updateStatusToClosed(idOrder: string) : Promise<Order>;
}