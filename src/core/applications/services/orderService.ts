import {CartRepository} from "../ports/cartRepository";
import {Order} from "../../domain/order";
import {OrderRepository} from "../ports/orderRepository";

export class OrderService {
    constructor(private readonly orderRepository: OrderRepository,
                private readonly cartRepository: CartRepository) { }

    async receiveOrder(idCart: string): Promise<Order> {
        const status = "RECEIVED";
        let estimatedDelivery: number = await this.estimatedDelivery(idCart);
        const id = ((await this.orderRepository.getAllOrders()).length+1).toString();
        const ordersReceived = (await this.getAllActiveOrders()).filter(value => (value.status == "RECEIVED" || value.status == "PREPARING") && id >= value.idOrder);
        for (const value of ordersReceived) {
            estimatedDelivery += await this.estimatedDelivery(value.idCart);
        }
        const order = {
            idOrder: id,
            idCart: idCart,
            receiveDate: new Date(),
            deliveryTime: estimatedDelivery,
            status: status
        };
        return this.orderRepository.receiveOrder(order);
    }

    async prepareOrder(idOrder: string): Promise<Order> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "PREPARING";
        return this.orderRepository.updateOrder(order);
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
        return await this.sendNotificationDelivery(idOrder);
    }

    async updateStatusToDelivered(idOrder: string): Promise<Order> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "DELIVERED";
        return this.orderRepository.updateOrder(order);
    }

    async updateStatusToClosed(idOrder: string): Promise<Order> { const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "CLOSED";
        return this.orderRepository.updateOrder(order);
    }
    async getAllActiveOrders(): Promise<Order[]>
    {
        return this.orderRepository.getActiveOrders();
    }

    private async estimatedDelivery(idCart: string): Promise<number>
    {
        const cart = Object.assign({}, await this.cartRepository.findCartById(idCart));
        return cart.products.reduce((sum, p) => sum + p.timeToPrepare, 0);

    }
}