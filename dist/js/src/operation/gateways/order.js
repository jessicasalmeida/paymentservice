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
exports.OrderGateway = void 0;
const order_1 = require("../../core/entities/order");
class OrderGateway {
    constructor(orderDataSource) {
        this.orderDataSource = orderDataSource;
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderDTO = {
                id: order.id,
                receiveDate: order.receiveDate,
                deliveryTime: order.deliveryTime,
                status: order.status,
                cart: order.cart
            };
            const sucesso = yield this.orderDataSource.create(orderDTO);
            return sucesso;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.orderDataSource.findOne(id);
            if (data) {
                const dataEntity = new order_1.OrderEntity((id = data.id), data.receiveDate, data.deliveryTime, data.status, data.cart);
                return dataEntity;
            }
            return null;
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderDTO = {
                id: order.id,
                receiveDate: order.receiveDate,
                deliveryTime: order.deliveryTime,
                status: order.status,
                cart: order.cart
            };
            const data = yield this.orderDataSource.update(id, orderDTO);
            if (data) {
                const dataEntity = new order_1.OrderEntity((id = data.id), data.receiveDate, data.deliveryTime, data.status, data.cart);
                return dataEntity;
            }
            return null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.orderDataSource.getAll();
            if (data) {
                var dataEntity = new Array();
                data.forEach(data => {
                    dataEntity.push(new order_1.OrderEntity(data.id, data.receiveDate, data.deliveryTime, data.status, data.cart));
                });
                return dataEntity;
            }
            return null;
        });
    }
}
exports.OrderGateway = OrderGateway;
