import {orderRepository} from "../../../core/applications/ports/order-repository";
import {Order} from "../../../core/domain/order";
import mongoose from "mongoose";
import {Int32} from "mongodb";

export class orderRepositoryMongoBd implements orderRepository {

    private readonly orders: Order[] = [
        {
            idOrder: "1",
            idCart: "1",
            receiveDate: new Date(),
            deliveryTime: 0,
            status: "READY"
        }];

    private readonly orderSchema = new mongoose.Schema({
        idOrder: {type:String, required:true},
        idCart: {type:String, required:true},
        receiveDate:{type:String, required:true},
        deliveryTime:{type:Number, required:true},
        status:{type:String, required:true}
    });
    private readonly orders1 = mongoose.model('order', this.orderSchema);
    async receiveOrder(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }

    async updateOrder(order: Order): Promise<Order> {
        const index = this.orders.indexOf(await this.findOrderById((order).idOrder));
        this.orders[index] = order;
        return order;
    }
    async getActiveOrders(): Promise<Order[]> {
        return this.orders.filter(value => value.status != "CLOSED" && value.status != "DELIVERED");
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orders;
    }

    async findOrderById(id: string) : Promise<Order>
    {
        const order = this.orders.find(u => u.idOrder === id);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        return order;
    }
}