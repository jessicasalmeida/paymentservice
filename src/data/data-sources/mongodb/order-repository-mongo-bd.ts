import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import { OrderDataSource } from "../../interfaces/data-sources/order-data-source";
import { OrderRequestModel, OrderResponseModel } from "../../../domain/models/order";

export class OrderRepositoryMongoBd implements OrderDataSource {

    async create(order: OrderRequestModel): Promise<OrderResponseModel> {
        await collections.orders?.insertOne(order);
        return order;
    }

    async update(id: string, order: OrderRequestModel): Promise<OrderResponseModel> {
        const query = { _id: new ObjectId(id)};
        await collections.orders?.updateOne(query, {$set: order});
        return order;
    }
   
    async getAll(): Promise<OrderResponseModel[]> {
        return await collections.orders?.find({}).toArray() as unknown as OrderResponseModel[];
    }

    async findOne(id: string) : Promise<OrderResponseModel>
    {
        const query = { _id: new ObjectId(id)};
        const order = await collections.orders?.findOne(query);
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }
        return order as unknown as OrderResponseModel;
    }
}