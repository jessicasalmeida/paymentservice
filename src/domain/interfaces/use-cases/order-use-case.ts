
import { OrderRequestModel, OrderResponseModel } from '../../models/order';

export interface OrderUseCase {
    receiveOrder(id: string): Promise<OrderResponseModel>;
    prepareOrder(idOrder: string): Promise<OrderResponseModel>
    estimateDelivery(idOrder: string): Promise<string>;
    sendNotificationDelivery(idOrder: string): Promise<string>;
    updateStatusToReady(idOrder: string): Promise<string>;
    updateStatusToDelivered(idOrder: string): Promise<OrderResponseModel> ;
    updateStatusToClosed(idOrder: string): Promise<OrderResponseModel>;
    getAllActiveOrders(): Promise<OrderResponseModel[]>;
   }