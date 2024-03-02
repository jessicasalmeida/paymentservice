import { OrderDataSource } from '../../data/interfaces/data-sources/order-data-source';
import { OrderRepository } from '../interfaces/repositories/order-repository';
import { OrderRequestModel, OrderResponseModel } from '../models/order';

export class OrderRepositoryImpl implements OrderRepository {
    constructor(private readonly orderRepository: OrderDataSource){ }

        async createOrder(order: OrderRequestModel): Promise<OrderResponseModel> {
            return this.orderRepository.create(order);
        }
    
        async updateOrder(id: string, order: OrderResponseModel): Promise<OrderResponseModel> {
            return this.orderRepository.update(id, order);
        }

        async getAllOrders(): Promise<OrderResponseModel[]>
        {
            return this.orderRepository.getAll();
        }

        async findOrderById(id: string): Promise<OrderResponseModel>
        {
            return this.orderRepository.findOne(id);
        }
} 