import {collections} from "./db-connect";
import { PagamentoDataSource } from "../../../common/interfaces/pagamento-data-source";
import { PagamentoDTO } from "../../../common/dtos/pagamento.dto";

export class PagamentoRepositoryMongoBd implements PagamentoDataSource {

    async create(order: PagamentoDTO): Promise<PagamentoDTO> {
        await collections.pagamento?.insertOne(order);
        return order;
    }

    async update(id: string, order: PagamentoDTO): Promise<PagamentoDTO> {
        const query = { id: (id)};
        await collections.pagamento?.updateOne(query, {$set: order});
        return order;
    }

    async findOne(id: string) : Promise<PagamentoDTO>
    {
        const query = { id: (id)};
        const order = await collections.pagamento?.findOne(query);
        if (!order) {
            
            throw new Error(`Order with id ${id} not found`);
        }
        return order as PagamentoDTO;
    }
}