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
exports.PagamentoGateway = void 0;
const pagamento_1 = require("../../core/entities/pagamento");
class PagamentoGateway {
    constructor(pagamentoDataSource) {
        this.pagamentoDataSource = pagamentoDataSource;
    }
    create(pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamentoDTO = {
                id: pagamento.id,
                status: pagamento.status,
                cart: pagamento.cart
            };
            const sucesso = yield this.pagamentoDataSource.create(pagamentoDTO);
            return sucesso;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.pagamentoDataSource.findOne(id);
            if (data) {
                const dataEntity = new pagamento_1.PagamentoEntity((data.id), data.status, data.cart);
                return dataEntity;
            }
            return null;
        });
    }
    update(id, pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamentoDTO = {
                id: pagamento.id,
                status: pagamento.status,
                cart: pagamento.cart
            };
            const data = yield this.pagamentoDataSource.update(id, pagamentoDTO);
            if (data) {
                const dataEntity = new pagamento_1.PagamentoEntity((data.id), data.status, data.cart);
                return dataEntity;
            }
            return null;
        });
    }
}
exports.PagamentoGateway = PagamentoGateway;
