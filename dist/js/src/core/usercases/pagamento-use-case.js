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
exports.PagamentoUseCase = void 0;
const pagamento_1 = require("../entities/pagamento");
const generators_1 = require("../../common/helpers/generators");
const mq_1 = require("../../external/mq/mq");
class PagamentoUseCase {
    constructor() {
        PagamentoUseCase.mq = new mq_1.RabbitMQ();
    }
    static newPagamento(newPagamentoDTO, paymentGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = true;
            const novoId = (0, generators_1.generateRandomString)();
            const order = new pagamento_1.PagamentoEntity(novoId, status, newPagamentoDTO.cart);
            const payment = paymentGateway.create(order);
            if (payment != null && order.status) {
                yield PagamentoUseCase.mq.connect();
                yield PagamentoUseCase.mq.publish('cart_paid', { payment: newPagamentoDTO });
                yield PagamentoUseCase.mq.close();
                return payment;
            }
            else {
                return null;
            }
        });
    }
    static listenForNewPayment(pagamentoGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            PagamentoUseCase.mq = new mq_1.RabbitMQ();
            yield PagamentoUseCase.mq.connect();
            yield PagamentoUseCase.mq.consume('new_payment', (message) => __awaiter(this, void 0, void 0, function* () {
                const payment = message.payment;
                PagamentoUseCase.newPagamento(payment, pagamentoGateway);
            }));
        });
    }
}
exports.PagamentoUseCase = PagamentoUseCase;
