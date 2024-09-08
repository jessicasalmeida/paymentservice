"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentoController = void 0;
const pagamento_use_case_1 = require("../../core/usercases/pagamento-use-case");
const pagamento_1 = require("../gateways/pagamento");
const pagamento_2 = require("../presenters/pagamento");
class PagamentoController {
    constructor(pagamentoDataSource) {
        const orderGateway = new pagamento_1.PagamentoGateway(pagamentoDataSource);
        pagamento_use_case_1.PagamentoUseCase.listenForNewPayment(orderGateway);
    }
    static newPagamento(newOrder, pagamentoDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderGateway = new pagamento_1.PagamentoGateway(pagamentoDataSource);
            if (!orderGateway) {
                throw new Error("Gateway Inválido");
            }
            const order = yield pagamento_use_case_1.PagamentoUseCase.newPagamento(newOrder, orderGateway);
            if (order) {
                return pagamento_2.PagamentoPresenter.toDTO(order);
            }
            return null;
        });
    }
}
exports.PagamentoController = PagamentoController;
