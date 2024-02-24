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
exports.orderRepositoryMongoBd = void 0;
const mongodb_1 = require("mongodb");
const db_connect_1 = require("./db-connect");
class orderRepositoryMongoBd {
    receiveOrder(order) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.insertOne(order));
            return order;
        });
    }
    updateOrder(order) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(order._id) };
            yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.updateOne(query, { $set: order }));
            return order;
        });
    }
    getActiveOrders() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { $and: [{ status: { $not: { $eq: "CLOSED" } } }, { status: { $not: { $eq: "DELIVERED" } } }] };
            const orders = yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.find(query).toArray());
            return orders;
        });
    }
    getAllOrders() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        });
    }
    findOrderById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const order = yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.findOne(query));
            if (!order) {
                throw new Error(`Order with id ${id} not found`);
            }
            return order;
        });
    }
}
exports.orderRepositoryMongoBd = orderRepositoryMongoBd;
