"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
//import {productRouter} from "./product-router";
const user_router_1 = require("./user-router");
//import {cartRouter} from "./cart-router";
//import {orderRouter} from "./order-router";
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
//routes.use("/product", productRouter);
exports.routes.use("/user", user_router_1.userRouter);
//routes.use("/cart", cartRouter);
//routes.use("/order", orderRouter);
