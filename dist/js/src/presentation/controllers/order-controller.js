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
exports.orderController = void 0;
class orderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    receiveOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.receiveOrder(id);
            res.status(200).json(order);
        });
    }
    prepareOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.prepareOrder(id);
            res.status(200).json(order);
        });
    }
    estimateDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.estimateDelivery(id);
            res.status(200).json(order);
        });
    }
    updateStatusToReady(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.updateStatusToReady(id);
            res.status(200).json(order);
        });
    }
    updateStatusToDelivered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.updateStatusToDelivered(id);
            res.status(200).json(order);
        });
    }
    updateStatusToClosed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.updateStatusToClosed(id);
            res.status(200).json(order);
        });
    }
    getAllActiveOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield this.orderService.getAllActiveOrders();
            res.status(200).json(order);
        });
    }
}
exports.orderController = orderController;
