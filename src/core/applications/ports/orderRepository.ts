import {Order} from "../../domain/order";

export interface OrderRepository {
    receiveOrder(order: Order): Promise<Order>;
    updateOrder(order: Order) : Promise<Order>;
    getActiveOrders(): Promise<Order[]>;
    getAllOrders(): Promise<Order[]>;
    findOrderById(idOrder: string): Promise<Order>;
}