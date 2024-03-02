import { ObjectId } from "mongodb";
import { CartDataSource } from "../../interfaces/data-sources/cart-data-source";
import { collections } from "./db-connect";
import { CartRequestModel, CartResponseModel } from "../../../domain/models/cart";

export class CartRepositoryMongoBd implements CartDataSource {

    async create(newCart:CartRequestModel): Promise<CartResponseModel> {
        await collections.carts?.insertOne(newCart);
        return newCart;
    }

    async update(id: string, newCart: CartRequestModel): Promise<CartResponseModel>
    {
        const query = { _id: new ObjectId(id)};
        await collections.carts?.updateOne(query, {$set: newCart});
        return newCart;
    }

    async getOne(id: string) : Promise<CartResponseModel>
    {
        const query = { _id: new ObjectId(id)};
        const cart = await collections.carts?.findOne(query);
        if(!cart)
        {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as unknown as CartResponseModel;
    }
}