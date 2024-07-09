"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPresenter = void 0;
class OrderPresenter {
    static toDTO(order) {
        let dto = {
            id: order.id,
            receiveDate: order.receiveDate,
            deliveryTime: order.deliveryTime,
            status: order.status,
            cart: order.cart
        };
        return dto;
    }
}
exports.OrderPresenter = OrderPresenter;
