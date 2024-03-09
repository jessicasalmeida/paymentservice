import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { CartDTO } from "../../../common/dtos/cart.dto";
import { OrderDTO } from '../../../common/dtos/order.dto';
import { ProductDTO } from "../../../common/dtos/product.dto";
import { UserDTO } from "../../../common/dtos/user.dto";

export const collections : {
    carts?: mongoDB.Collection<CartDTO>,
    orders?: mongoDB.Collection<OrderDTO>,
    product?: mongoDB.Collection<ProductDTO>,
    user?: mongoDB.Collection<UserDTO>} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const cartCollection = db.collection<CartDTO>(process.env.CART_COLLECTION_NAME as string);
    const orderCollection = db.collection<OrderDTO>(process.env.ORDER_COLLECTION_NAME as string);
    const productCollection = db.collection<ProductDTO>(process.env.PRODUCT_COLLECTION_NAME as string);
    const userCollection = db.collection<UserDTO>(process.env.USER_COLLECTION_NAME as string);

    collections.carts = cartCollection;
    collections.orders = orderCollection;
    collections.product = productCollection;
    collections.user = userCollection;

    console.log(`Conexão :` + process.env.DB_CONN_STRING as string);
}