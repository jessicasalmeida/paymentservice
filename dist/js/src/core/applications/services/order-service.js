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
exports.orderService = void 0;
const mongodb_1 = require("mongodb");
class orderService {
    constructor(orderRepository, cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }
    receiveOrder(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = "RECEIVED";
            let estimatedDelivery = yield this.estimatedDelivery(idCart);
            const ordersReceived = (yield this.getAllActiveOrders()).filter(value => (value.status == "RECEIVED" || value.status == "PREPARING")
                && Date.now().valueOf() >= value.receiveDate.valueOf());
            for (const value of ordersReceived) {
                estimatedDelivery += yield this.estimatedDelivery(value.idCart);
            }
            const order = {
                _id: new mongodb_1.ObjectId(),
                idCart: idCart,
                receiveDate: new Date(),
                deliveryTime: estimatedDelivery,
                status: status
            };
            return this.orderRepository.receiveOrder(order);
        });
    }
    prepareOrder(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOrderById(idOrder);
            order.status = "PREPARING";
            return this.orderRepository.updateOrder(order);
        });
    }
    estimateDelivery(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOrderById(idOrder);
            let estimatedDelivery = new Date((order.receiveDate.getTime() + order.deliveryTime * 60000));
            return `The estimate time to order is ready is ${estimatedDelivery}`;
        });
    }
    sendNotificationDelivery(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderRepository.findOrderById(idOrder);
            return `The order is ready to delivery`;
        });
    }
    updateStatusToReady(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOrderById(idOrder);
            order.status = "READY";
            return yield this.sendNotificationDelivery(idOrder);
        });
    }
    updateStatusToDelivered(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOrderById(idOrder);
            order.status = "DELIVERED";
            return this.orderRepository.updateOrder(order);
        });
    }
    updateStatusToClosed(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOrderById(idOrder);
            order.status = "CLOSED";
            return this.orderRepository.updateOrder(order);
        });
    }
    getAllActiveOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.getActiveOrders();
        });
    }
    estimatedDelivery(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = Object.assign({}, yield this.cartRepository.findCartById(idCart));
            return cart.products.reduce((sum, p) => sum + p.timeToPrepare, 0);
        });
    }
}
exports.orderService = orderService;
