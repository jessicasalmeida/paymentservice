import { PagamentoDTO } from '../dtos/pagamento.dto';
export interface PagamentoDataSource
{
    create(order: PagamentoDTO): Promise<PagamentoDTO>;
    update(id:string, order: PagamentoDTO) : Promise<PagamentoDTO>;
    findOne(idOrder: string): Promise<PagamentoDTO>;
}