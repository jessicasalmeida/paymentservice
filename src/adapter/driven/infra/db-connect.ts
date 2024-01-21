import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Cart from "../../../core/domain/cart";
export const collections : {carts?: mongoDB.Collection<Cart>} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    //await applySchemaValidation(db);
    const cartCollection = db.collection<Cart>(process.env.CART_COLLECTION_NAME as string);
    collections.carts = cartCollection;

    console.log(`Sucesso`);
}