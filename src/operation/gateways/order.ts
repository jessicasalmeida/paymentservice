import { OrderDTO } from '../../common/dtos/order.dto';
import { OrderDataSource } from '../../common/interfaces/order-data-source';
import { OrderEntity } from '../../core/entities/order';

export class OrderGateway {
    orderDataSource: OrderDataSource;
    constructor(orderDataSource: OrderDataSource) {
        this.orderDataSource = orderDataSource;
    }

    async create(order: OrderEntity): Promise<OrderEntity | null> {

        const orderDTO: OrderDTO =
        {
            id: order.id,
            receiveDate: order.receiveDate,
            deliveryTime: order.deliveryTime,
            status: order.status,
            cart: order.cart
        };

        const sucesso = await this.orderDataSource.create(orderDTO);
        return sucesso;
    }

    async findOne(id: string): Promise<OrderEntity | null> {
        const data = await this.orderDataSource.findOne(id);
        if (data) {
            const dataEntity = new OrderEntity(
                (id = data.id), data.receiveDate, data.deliveryTime, data.status, data.cart);
            return dataEntity;
        }
        return null;
    }

    async update(id: string, order: OrderEntity): Promise<OrderEntity | null> {
        const orderDTO: OrderDTO =
        {
            id: order.id,
            receiveDate: order.receiveDate,
            deliveryTime: order.deliveryTime,
            status: order.status,
            cart: order.cart
        };

        const data = await this.orderDataSource.update(id, orderDTO);
        if (data) {
            const dataEntity = new OrderEntity(
                (id = data.id), data.receiveDate, data.deliveryTime, data.status, data.cart);
            return dataEntity;
        }
        return null;
    }

    async getAll(): Promise<OrderEntity[] | null> {

        const data = await this.orderDataSource.getAll();
        if (data) {
            var dataEntity: Array<OrderEntity> = new Array();
            data.forEach(data => {
                dataEntity.push(new OrderEntity(
                    data.id, data.receiveDate, data.deliveryTime, data.status, data.cart));
            });

            return dataEntity;
        }
        return null;
    }
}