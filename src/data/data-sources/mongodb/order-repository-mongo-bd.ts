import {orderRepository} from "../../../core/applications/ports/order-repository";
import order from "../../../core/domain/order";
import {Int32, ObjectId} from "mongodb";
import {collections} from "./db-connect";

export class orderRepositoryMongoBd implements orderRepository {

    async receiveOrder(order: order): Promise<order> {
        await collections.orders?.insertOne(order);
        return order;
    }

    async updateOrder(order: order): Promise<order> {
        const query = { _id: new ObjectId(order._id)};
        await collections.orders?.updateOne(query, {$set: order});
        return order;
    }
    async getActiveOrders(): Promise<order[]> {
        const query = { $and: [ {status: {$not: {$eq:"CLOSED"}}}, {status: {$not: {$eq:"DELIVERED"}}}]};
        const orders = await collections.orders?.find(query).toArray() as order[];
        return orders;
    }

    async getAllOrders(): Promise<order[]> {
        return await collections.orders?.find({}).toArray() as order[];
    }

    async findOrderById(id: string) : Promise<order>
    {
        const query = { _id: new ObjectId(id)};
        const order = await collections.orders?.findOne(query);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        return order;
    }
}