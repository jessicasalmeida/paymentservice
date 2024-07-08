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
exports.OrderUseCase = void 0;
const order_1 = require("../entities/order");
const generators_1 = require("../../common/helpers/generators");
class OrderUseCase {
    static receiveOrder(idCart, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = "RECEIVED";
            let estimatedDelivery = yield OrderUseCase.estimatedDelivery(idCart);
            const ordersReceived = (yield OrderUseCase.getAllActiveOrders(orderGateway));
            if (ordersReceived) {
                ordersReceived.filter(value => (value.status == "RECEIVED" || value.status == "PREPARING")
                    && Date.now().valueOf() >= value.receiveDate.valueOf());
                for (const value of ordersReceived) {
                    estimatedDelivery += yield OrderUseCase.estimatedDelivery(value.idCart);
                }
            }
            const novoId = (0, generators_1.generateRandomString)();
            const order = new order_1.OrderEntity(novoId, idCart, new Date(), estimatedDelivery, status);
            const nOrder = orderGateway.create(order);
            if (nOrder) {
                return nOrder;
            }
            else {
                return null;
            }
        });
    }
    static prepareOrder(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                order.status = "PREPARING";
                return orderGateway.update(idOrder, order);
            }
            else {
                return null;
            }
        });
    }
    static estimateDelivery(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                let estimatedDelivery = new Date((order.receiveDate.getTime() + order.deliveryTime * 60000));
                return `The estimate time to order is ready is ${estimatedDelivery}`;
            }
            else {
                return "Order não encontrada";
            }
        });
    }
    static sendNotificationDelivery(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                return `The order is ready to delivery`;
            }
            else {
                return "Order não encontrada";
            }
        });
    }
    static updateStatusToReady(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                order.status = "READY";
                yield orderGateway.update(idOrder, order);
                return OrderUseCase.sendNotificationDelivery(idOrder, orderGateway);
            }
            else {
                return "Ordem não encontrada";
            }
        });
    }
    static updateStatusToDelivered(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                order.status = "DELIVERED";
                return orderGateway.update(idOrder, order);
            }
            else {
                return null;
            }
        });
    }
    static updateStatusToClosed(idOrder, orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderGateway.findOne(idOrder);
            if (order) {
                order.status = "CLOSED";
                return orderGateway.update(idOrder, order);
            }
            else {
                return null;
            }
        });
    }
    static getAllActiveOrders(orderGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield orderGateway.getAll();
            if (result) {
                return result.filter((p) => p.status !== "CLOSED" && p.status !== "DELIVERED");
            }
            else {
                return null;
            }
        });
    }
    static estimatedDelivery(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = Object.assign({}, yield cartGateway.getOne(idCart));
            return cart.products.reduce((sum, p) => sum + p.timeToPrepare, 0);
        });
    }
}
exports.OrderUseCase = OrderUseCase;
