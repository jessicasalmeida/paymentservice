"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.paymentOrder = void 0;
const express_1 = __importStar(require("express"));
const pagamento_repository_mongo_bd_1 = require("../../data-sources/mongodb/pagamento-repository-mongo-bd");
const pagamento_controller_1 = require("../../../operation/controllers/pagamento-controller");
const orderRepository = new pagamento_repository_mongo_bd_1.PagamentoRepositoryMongoBd();
const pagamentoController = new pagamento_controller_1.PagamentoController(orderRepository);
exports.paymentOrder = (0, express_1.Router)();
exports.paymentOrder.use(express_1.default.json());
exports.paymentOrder.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Order']
        #swagger.summary = 'Receive'
        #swagger.description = 'Endpoint to receive a order' */
    const newOrder = req.body;
    const order = yield pagamento_controller_1.PagamentoController.newPagamento(newOrder, orderRepository);
    res.status(200).json(order);
}));
