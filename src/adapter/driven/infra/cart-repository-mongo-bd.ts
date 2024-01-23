import {cartRepository} from "../../../core/applications/ports/cart-repository";
import cart from "../../../core/domain/cart";
import {collections} from "./db-connect";
import {ObjectId} from "mongodb";

export class cartRepositoryMongoBd implements cartRepository {

    async createCart(newCart:cart): Promise<cart> {
        await collections.carts?.insertOne(newCart);
        return newCart;
    }

    async updateCart(newCart: cart): Promise<cart>
    {
        const query = { _id: new ObjectId(newCart._id)};
        await collections.carts?.updateOne(query, {$set: newCart});
        return newCart;
    }
    async findCartById(id: string) : Promise<cart>
    {
        const query = { _id: new ObjectId(id)};
        const cart = await collections.carts?.findOne(query);
        if(!cart)
        {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as cart;
    }
}