/* import {cartRepository} from "../../../domain/interfaces/repositories/cart-repository";
import order from "../../domain/order";
import {orderRepository} from "../ports/order-repository";
import {ObjectId} from "mongodb";

export class orderService {
    constructor(private readonly orderRepository: orderRepository,
                private readonly cartRepository: cartRepository) { }

    async receiveOrder(idCart: string): Promise<order> {
        const status = "RECEIVED";
        let estimatedDelivery: number = await this.estimatedDelivery(idCart);
        const ordersReceived = (await this.getAllActiveOrders()).filter(value =>
            (value.status == "RECEIVED" || value.status == "PREPARING")
            && Date.now().valueOf() >= value.receiveDate.valueOf());
        for (const value of ordersReceived) {
            estimatedDelivery += await this.estimatedDelivery(value.idCart);
        }
        const order = {
            _id: new ObjectId(),
            idCart: idCart,
            receiveDate: new Date(),
            deliveryTime: estimatedDelivery,
            status: status
        };
        return this.orderRepository.receiveOrder(order);
    }

    async prepareOrder(idOrder: string): Promise<order> {
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

    async updateStatusToDelivered(idOrder: string): Promise<order> {
        const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "DELIVERED";
        return this.orderRepository.updateOrder(order);
    }

    async updateStatusToClosed(idOrder: string): Promise<order> { const order = await this.orderRepository.findOrderById(idOrder);
        order.status = "CLOSED";
        return this.orderRepository.updateOrder(order);
    }
    async getAllActiveOrders(): Promise<order[]>
    {
        return this.orderRepository.getActiveOrders();
    }

    private async estimatedDelivery(idCart: string): Promise<number>
    {
        const cart = Object.assign({}, await this.cartRepository.findCartById(idCart));
        return cart.products.reduce((sum: any, p: { timeToPrepare: any; }) => sum + p.timeToPrepare, 0);
    }
} */