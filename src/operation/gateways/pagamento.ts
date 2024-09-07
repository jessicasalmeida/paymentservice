import { PagamentoDTO } from '../../common/dtos/pagamento.dto';
import { PagamentoDataSource } from '../../common/interfaces/pagamento-data-source';
import { PagamentoEntity } from '../../core/entities/pagamento';

export class PagamentoGateway {
    pagamentoDataSource: PagamentoDataSource;
    constructor(pagamentoDataSource: PagamentoDataSource) {
        this.pagamentoDataSource = pagamentoDataSource;
    }

    async create(pagamento: PagamentoEntity): Promise<PagamentoEntity | null> {

        const pagamentoDTO: PagamentoDTO =
        {
            id: pagamento.id,
            status: pagamento.status,
            cart: pagamento.cart
        };

        const sucesso = await this.pagamentoDataSource.create(pagamentoDTO);
        return sucesso;
    }

    async findOne(id: string): Promise<PagamentoEntity | null> {
        const data = await this.pagamentoDataSource.findOne(id);
        if (data) {
            const dataEntity = new PagamentoEntity(
                (data.id), data.status,  data.cart);
            return dataEntity;
        }
        return null;
    }

    async update(id: string, pagamento: PagamentoEntity): Promise<PagamentoEntity | null> {
        const pagamentoDTO: PagamentoDTO =
        {
            id: pagamento.id,
            status: pagamento.status,
            cart: pagamento.cart
        };

        const data = await this.pagamentoDataSource.update(id, pagamentoDTO);
        if (data) {
            const dataEntity = new PagamentoEntity(
                (data.id), data.status, data.cart);
            return dataEntity;
        }
        return null;
    }

}