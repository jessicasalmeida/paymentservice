import { OrderDTO } from '../dtos/order.dto';
export interface OrderDataSource
{
    create(order: OrderDTO): Promise<OrderDTO>;
    update(id:string, order: OrderDTO) : Promise<OrderDTO>;
    getAll(): Promise<OrderDTO[]>;
    findOne(idOrder: string): Promise<OrderDTO>;
}