import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { userResponseModel } from "../../../domain/models/user";
export const collections : {
   // carts?: mongoDB.Collection<cart>,
   // orders?: mongoDB.Collection<order>,
   // product?: mongoDB.Collection<product>,
    user?: mongoDB.Collection} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    //await applySchemaValidation(db);
    //const cartCollection = db.collection<cart>(process.env.CART_COLLECTION_NAME as string);
    //const orderCollection = db.collection<order>(process.env.ORDER_COLLECTION_NAME as string);
    //const productCollection = db.collection<product>(process.env.PRODUCT_COLLECTION_NAME as string);
    const userCollection = db.collection(process.env.USER_COLLECTION_NAME as string);

    //collections.carts = cartCollection;
    //collections.orders = orderCollection;
    //collections.product = productCollection;
    collections.user = userCollection;

    console.log(`Conexão :` + process.env.DB_CONN_STRING as string);
}