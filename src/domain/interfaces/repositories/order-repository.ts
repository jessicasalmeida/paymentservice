import { OrderRequestModel, OrderResponseModel } from "../../models/order";

export interface OrderRepository {
    createOrder(order: OrderRequestModel): Promise<OrderResponseModel>;
    updateOrder(id: string, order: OrderResponseModel) : Promise<OrderResponseModel>;
    getAllOrders(): Promise<OrderResponseModel[]>;
    findOrderById(idOrder: string): Promise<OrderResponseModel>;
}