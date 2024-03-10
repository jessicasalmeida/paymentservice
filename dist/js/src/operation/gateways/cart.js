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
exports.CartGateway = void 0;
const cart_1 = require("../../core/entities/cart");
class CartGateway {
    constructor(cartDataSource) {
        this.cartDataSource = cartDataSource;
    }
    createcart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartDTO = {
                id: cart.id,
                user: cart.user,
                products: cart.products,
                totalValue: cart.totalValue,
                status: cart.status,
                payment: cart.payment
            };
            const sucesso = yield this.cartDataSource.create(cartDTO);
            return sucesso;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.cartDataSource.getOne(id);
            if (data) {
                const dataEntity = new cart_1.CartEntity((id = data.id), data.user, data.products, data.totalValue, data.status, data.payment);
                return dataEntity;
            }
            return null;
        });
    }
    update(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartDTO = {
                id: cart.id,
                user: cart.user,
                products: cart.products,
                totalValue: cart.totalValue,
                status: cart.status,
                payment: cart.payment
            };
            const data = yield this.cartDataSource.update(id, cartDTO);
            if (data) {
                const dataEntity = new cart_1.CartEntity((id = data.id), data.user, data.products, data.totalValue, data.status, data.payment);
                return dataEntity;
            }
            return null;
        });
    }
}
exports.CartGateway = CartGateway;
