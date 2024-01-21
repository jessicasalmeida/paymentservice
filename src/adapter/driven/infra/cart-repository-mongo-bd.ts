import {cartRepository} from "../../../core/applications/ports/cart-repository";
import Cart from "../../../core/domain/cart";
import {collections} from "./db-connect";
import {ObjectId} from "mongodb";

export class cartRepositoryMongoBd implements cartRepository {

    async createCart(newCart:Cart): Promise<Cart> {
        await collections.carts?.insertOne(newCart);
        return newCart;
    }

    async updateCart(newCart: Cart): Promise<Cart>
    {
        const query = { _id: new ObjectId(newCart._id)};
        await collections.carts?.updateOne(query, {$set: newCart});
        return newCart;
    }

    async findCartById(id: string) : Promise<Cart>
    {
        const query = { _id: new ObjectId(id)};
        const cart = await collections.carts?.findOne(query);
        if(!cart)
        {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as Cart;
    }
}