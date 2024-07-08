
import {orderRouter} from "./order-router";
import express from "express";

export const routes = express.Router();

routes.use("/order", orderRouter);