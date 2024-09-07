"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const pagamento_router_1 = require("./pagamento-router");
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
exports.routes.use("/payment", pagamento_router_1.paymentOrder);
