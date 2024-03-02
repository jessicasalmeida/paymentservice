import { OrderRequestModel, OrderResponseModel } from '../../../domain/models/order';
export interface OrderDataSource
{
    create(order: OrderRequestModel): Promise<OrderResponseModel>;
    update(id:string, order: OrderRequestModel) : Promise<OrderResponseModel>;
    getAll(): Promise<OrderResponseModel[]>;
    findOne(idOrder: string): Promise<OrderResponseModel>;
}