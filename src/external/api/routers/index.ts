
import {paymentOrder} from "./pagamento-router";
import express from "express";

export const routes = express.Router();

routes.use("/payment", paymentOrder);