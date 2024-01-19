import {OrderRepository} from "../../../core/applications/ports/orderRepository";
import {Order} from "../../../core/domain/order";
import {Cart} from "../../../core/domain/cart";
import {User} from "../../../core/domain/user";
import {Produto} from "../../../core/domain/produto";

export class InMemoryOrderRepository implements OrderRepository {

    private readonly produtos: Produto[] = [
        { id: "1", name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "Lanche", price: 10, timeToPrepare: 15, status: true},
        { id: "2", name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "Lanche", price: 10,timeToPrepare: 15, status: true},
    ];

    private readonly carts: Cart[] =[{
        id: "1",
        user: {} as User,
        produtosList: this.produtos,
        valorTotal: 0,
        status: "",
        pago: true
    }];

    private readonly orders: Order[] = [
        {
            idOrder: "1",
            idCart: "1",
            receiveDate: new Date(),
            deliveryTime: 0,
            status: "READY"
        },
        {
            idOrder: "2",
            idCart: "1",
            receiveDate: new Date(),
            deliveryTime: 0,
            status: "RECEIVED"
        },
        {
            idOrder: "3",
            idCart: "1",
            receiveDate: new Date(),
            deliveryTime: 0,
            status: "RECEIVED"
        }];

    async receiveOrder(idCart: string): Promise<Order> {
        const cart = this.findCartById(idCart);
        const id = (this.orders.length+1).toString();
        const status = "RECEIVED";
        let estimatedDelivery = 0;
        const ordersReceived = this.orders.filter(value => (value.status == "RECEIVED" || value.status == "PREPARING") && id >= value.idOrder);
        ordersReceived.forEach(value => {
            estimatedDelivery += this.findCartById(value.idCart).produtosList.reduce((sum, p) => sum + p.timeToPrepare, 0)
        });
        const order = {
            idOrder: id,
            idCart: idCart,
            receiveDate: new Date(),
            deliveryTime: estimatedDelivery,
            status: status
        };
        this.orders.push(order);
        return order;
    }

    async prepareOrder(idOrder: string): Promise<Order> {
        const order = this.findOrderById(idOrder);
        const index = this.orders.indexOf(order);
        order.status = "PREPARING";
        this.orders[index] = order;
        return order;
    }
    async estimateDelivery(idOrder: string): Promise<string> {
        const order = this.findOrderById(idOrder);
        const index = this.orders.indexOf(order);
        let estimatedDelivery = new Date((order.receiveDate.getTime() + order.deliveryTime*60000));
        return `The estimate time to order is ready is ${estimatedDelivery}`;
    }

    async sendNotificationEstimatedTime(idOrder: string): Promise<string> {
        const order = this.findOrderById(idOrder);
        return `The estimated time to order is ${order.deliveryTime}`;
    }

    async sendNotificationDelivery(idOrder: string): Promise<string> {
        const order = this.findOrderById(idOrder);
        return `The order is ready to delivery`;
    }

    async updateStatusToReady(idOrder: string): Promise<Order> {
        const order = this.findOrderById(idOrder);
        const index = this.orders.indexOf(order);
        order.status = "READY";
        this.orders[index] = order;
        return order;
    }

    async updateStatusToDelivered(idOrder: string): Promise<Order> {
        const order = this.findOrderById(idOrder);
        const index = this.orders.indexOf(order);
        order.status = "DELIVERED";
        this.orders[index] = order;
        return order;
    }

    async updateStatusToClosed(idOrder: string): Promise<Order> {
        const order = this.findOrderById(idOrder);
        const index = this.orders.indexOf(order);
        order.status = "CLOSED";
        this.orders[index] = order;
        return order;
    }

    async getAllActiveOrders(): Promise<Order[]> {
        return this.orders.filter(value => value.status != "CLOSED");
    }
    private findOrderById(id: string) : Order
    {
        const order = this.orders.find(u => u.idOrder === id);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        return order;
    }
    private findCartById(id: string) : Cart
    {
        const cart = this.carts.find(u => u.id === id);
        if (!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart;
    }

}