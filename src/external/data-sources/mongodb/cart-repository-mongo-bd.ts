import { ObjectId } from "mongodb";
import { CartDataSource } from "../../../common/interfaces/cart-data-source";
import { collections } from "./db-connect";
import { CartDTO } from '../../../common/dtos/cart.dto';

export class CartRepositoryMongoBd implements CartDataSource {

    async create(newCart:CartDTO): Promise<CartDTO> {
        return  await collections.carts?.insertOne(newCart) as unknown as CartDTO;
    }   

    async update(id: string, newCart: CartDTO): Promise<CartDTO>
    {
        const query = { _id: new ObjectId(id)};
        await collections.carts?.updateOne(query, {$set: newCart});
        return newCart;
    }

    async getOne(id: string) : Promise<CartDTO>
    {
        const query = { _id: new ObjectId(id)};
        const cart = await collections.carts?.findOne(query);
        if(!cart)
        {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as CartDTO;
    }
}