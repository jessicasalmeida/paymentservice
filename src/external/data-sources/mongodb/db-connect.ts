import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { OrderDTO } from '../../../common/dtos/order.dto';

export const collections : {
    orders?: mongoDB.Collection<OrderDTO>} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const orderCollection = db.collection<OrderDTO>(process.env.ORDER_COLLECTION_NAME as string);

    collections.orders = orderCollection;

    console.log(`Conexão :` + process.env.DB_CONN_STRING as string);
}