import order from "../../domain/order";

export interface orderRepository {
    receiveOrder(order: order): Promise<order>;
    updateOrder(order: order) : Promise<order>;
    getActiveOrders(): Promise<order[]>;
    getAllOrders(): Promise<order[]>;
    findOrderById(idOrder: string): Promise<order>;
}