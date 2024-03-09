import { OrderUseCase } from '../interfaces/use-cases/order-use-case';
import { OrderResponseModel } from '../models/order';
import { OrderRepository } from '../interfaces/repositories/order-repository';
import { CartUseCaseImpl } from './cart-use-case';
import { CartRepository } from '../interfaces/repositories/cart-repository';

export class OrderUseCaseImpl implements OrderUseCase{
    orderRepository: OrderRepository
    cartRepository: CartRepository
    constructor( orderRepository: OrderRepository, cartRepository: CartRepository){
        this.orderRepository = orderRepository
        this.cartRepository = cartRepository
    }

    async receiveOrder(idCart: string): Promise<OrderResponseModel> {
        const status = "RECEIVED";
        let estimatedDelivery: number = await this.estimatedDelivery(idCart);
        const ordersReceived = (await this.getAllActiveOrders()).filter(value =>
            (value.status == "RECEIVED" || value.status == "PREPARING")
            && Date.now().valueOf() >= value.receiveDate.valueOf());
        for (const value of ordersReceived) {
            estimatedDelivery += await this.estimatedDelivery(value.idCart);
        }
        const order = {
            idCart: idCart,
            receiveDate: new Date(),
            deliveryTime: estimatedDelivery,
            status: status
        };
        return this.orderRepository.createOrder(order);
    }

    async prepareOrder(idOrder: string): Promise<OrderResponseModel> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "PREPARING";
        return this.orderRepository.updateOrder(idOrder, order);
    }

    async estimateDelivery(idOrder: string): Promise<string>{
        const order = await this.orderRepository.findOrderById(idOrder);
        let estimatedDelivery = new Date((order.receiveDate.getTime() + order.deliveryTime*60000));
        return `The estimate time to order is ready is ${estimatedDelivery}`;
    }

    async sendNotificationDelivery(idOrder: string): Promise<string> {
        await this.orderRepository.findOrderById(idOrder);
        return `The order is ready to delivery`;
    }

    async updateStatusToReady(idOrder: string): Promise<string> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "READY";
        await this.orderRepository.updateOrder(idOrder, order);
        return this.sendNotificationDelivery(idOrder);
    }

    async updateStatusToDelivered(idOrder: string): Promise<OrderResponseModel> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "DELIVERED";
        return this.orderRepository.updateOrder(idOrder, order);
    }

    async updateStatusToClosed(idOrder: string): Promise<OrderResponseModel> { const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "CLOSED";
        return this.orderRepository.updateOrder(idOrder, order);
    }
    async getAllActiveOrders(): Promise<OrderResponseModel[]>
    {
        const result = await this.orderRepository.getAllOrders();
        return result.filter((p) => p.status !== "CLOSED" && p.status !== "DELIVERED")
        
    }

    private async estimatedDelivery(idCart: string): Promise<number>
    {
        const cart = Object.assign({}, await this.cartRepository.getOne(idCart));
        return cart.products.reduce((sum: any, p: { timeToPrepare: any; }) => sum + p.timeToPrepare, 0);
    }
}