import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections : {
    carts?: mongoDB.Collection,
    cart?: mongoDB.Collection,
    orders?: mongoDB.Collection,
    product?: mongoDB.Collection,
    user?: mongoDB.Collection} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const cartCollection = db.collection(process.env.CART_COLLECTION_NAME as string);
    const cart2Collection = db.collection(process.env.CART_COLLECTION_NAME as string);
    const orderCollection = db.collection(process.env.ORDER_COLLECTION_NAME as string);
    const productCollection = db.collection(process.env.PRODUCT_COLLECTION_NAME as string);
    const userCollection = db.collection(process.env.USER_COLLECTION_NAME as string);

    collections.carts = cartCollection;
    collections.cart = cart2Collection;
    collections.orders = orderCollection;
    collections.product = productCollection;
    collections.user = userCollection;

    console.log(`Conexão :` + process.env.DB_CONN_STRING as string);
}