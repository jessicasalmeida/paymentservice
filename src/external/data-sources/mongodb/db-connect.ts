import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { PagamentoDTO } from '../../../common/dtos/pagamento.dto';

export const collections : {
    pagamento?: mongoDB.Collection<PagamentoDTO>} = {};

export async function connectToDataBase()
{
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const pagamentoCollection = db.collection<PagamentoDTO>(process.env.PAYMENT_COLLECTION_NAME as string);

    collections.pagamento = pagamentoCollection;

    console.log(`Conexão :` + process.env.DB_CONN_STRING as string);
}