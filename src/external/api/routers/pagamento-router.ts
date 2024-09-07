import express, { Router } from "express";
import { PagamentoRepositoryMongoBd } from "../../data-sources/mongodb/pagamento-repository-mongo-bd";
import { PagamentoController} from '../../../operation/controllers/pagamento-controller';

const orderRepository = new PagamentoRepositoryMongoBd();
const pagamentoController = new PagamentoController(orderRepository);

export const paymentOrder = Router();

paymentOrder.use(express.json());

paymentOrder.post('/', async (req, res) => {
    /*  #swagger.tags = ['Order']
        #swagger.summary = 'Receive'
        #swagger.description = 'Endpoint to receive a order' */
    const newOrder = req.body;
    const order = await PagamentoController.newPagamento(newOrder, orderRepository);
    res.status(200).json(order);
});