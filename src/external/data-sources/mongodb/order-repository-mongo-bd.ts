import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import { OrderDataSource } from "../../../common/interfaces/order-data-source";
import { OrderDTO } from "../../../common/dtos/order.dto";

export class OrderRepositoryMongoBd implements OrderDataSource {

    async create(order: OrderDTO): Promise<OrderDTO> {
        await collections.orders?.insertOne(order);
        return order;
    }

    async update(id: string, order: OrderDTO): Promise<OrderDTO> {
        const query = { _id: new ObjectId(id)};
        await collections.orders?.updateOne(query, {$set: order});
        return order;
    }
   
    async getAll(): Promise<OrderDTO[]> {
        return await collections.orders?.find({}).toArray() as OrderDTO[];
    }

    async findOne(id: string) : Promise<OrderDTO>
    {
        const query = { _id: new ObjectId(id)};
        const order = await collections.orders?.findOne(query);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        return order as OrderDTO;
    }
}