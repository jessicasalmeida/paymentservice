import { PagamentoDTO } from '../../common/dtos/pagamento.dto';
import { PagamentoEntity } from "../../core/entities/pagamento";

export class PagamentoPresenter {
    static toDTO(
        pagamento: PagamentoEntity
    ): PagamentoDTO {
        let dto: PagamentoDTO = {
            id: pagamento.id,
            status: pagamento.status,
            cart: pagamento.cart
        };
        return dto;
    }
}
