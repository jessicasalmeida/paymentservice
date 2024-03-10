"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartEntity = void 0;
class CartEntity {
    constructor(id, user, products, totalValue, status, payment) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
    }
}
exports.CartEntity = CartEntity;
