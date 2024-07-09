"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
class OrderEntity {
    constructor(id, receiveDate, deliveryTime, status, cart) {
        this.id = id;
        this.receiveDate = receiveDate;
        this.deliveryTime = deliveryTime;
        this.status = status;
        this.cart = cart;
    }
}
exports.OrderEntity = OrderEntity;
