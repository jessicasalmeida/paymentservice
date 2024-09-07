"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentoPresenter = void 0;
class PagamentoPresenter {
    static toDTO(pagamento) {
        let dto = {
            id: pagamento.id,
            status: pagamento.status,
            cart: pagamento.cart
        };
        return dto;
    }
}
exports.PagamentoPresenter = PagamentoPresenter;
