"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
class OrderEntity {
    constructor(id, idCart, receiveDate, deliveryTime, status) {
        this.id = id;
        this.idCart = idCart;
        this.receiveDate = receiveDate;
        this.deliveryTime = deliveryTime;
        this.status = status;
    }
}
exports.OrderEntity = OrderEntity;
