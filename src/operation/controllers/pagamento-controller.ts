import { PagamentoUseCase } from "../../core/usercases/pagamento-use-case";
import { PagamentoGateway } from '../gateways/pagamento';
import { PagamentoDataSource } from '../../common/interfaces/pagamento-data-source';
import { PagamentoPresenter } from "../presenters/pagamento";
import { NewPagamentoDTO } from "../../common/dtos/pagamento.dto";

export class PagamentoController {
    constructor(pagamentoDataSource: PagamentoDataSource) {
        const orderGateway = new PagamentoGateway(pagamentoDataSource);
        PagamentoUseCase.listenForNewPayment(orderGateway);
    }

    static async newPagamento(newOrder: NewPagamentoDTO, pagamentoDataSource: PagamentoDataSource) {
        const orderGateway = new PagamentoGateway(pagamentoDataSource);
        if (!orderGateway) {
            throw new Error("Gateway Inválido");
        }
        const order = await PagamentoUseCase.newPagamento(newOrder, orderGateway);
        if(order)
        {
            return PagamentoPresenter.toDTO(order);
        }
        return null;
    }
}