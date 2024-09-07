import { PagamentoGateway } from "../../operation/gateways/pagamento";
import { PagamentoEntity } from "../entities/pagamento";
import { generateRandomString } from "../../common/helpers/generators";
import { NewPagamentoDTO } from '../../common/dtos/pagamento.dto';
import { RabbitMQ } from "../../external/mq/mq";

export class PagamentoUseCase {
    private static mq: RabbitMQ;

    constructor() {
        PagamentoUseCase.mq = new RabbitMQ();
    }

    static async newPagamento(newPagamentoDTO: NewPagamentoDTO, paymentGateway: PagamentoGateway): Promise<PagamentoEntity | null> {
        const status = true;
        const novoId = generateRandomString();
        const order = new PagamentoEntity(
            novoId,
            status,
            newPagamentoDTO.cart
        );
        const payment = paymentGateway.create(order);
        if (payment != null && order.status) {
            await PagamentoUseCase.mq.connect();
            await PagamentoUseCase.mq.publish('cart_paid', { payment: newPagamentoDTO });
            await PagamentoUseCase.mq.close();
            return payment;
        }
        else {
            return null;
        }
    }

    static async listenForNewPayment(pagamentoGateway: PagamentoGateway): Promise<void> {
        PagamentoUseCase.mq = new RabbitMQ();
        await PagamentoUseCase.mq.connect();
        await PagamentoUseCase.mq.consume('new_payment',  async (message: any) => {
            const payment: NewPagamentoDTO = message.payment;
            PagamentoUseCase.newPagamento(payment, pagamentoGateway);
        });
    }

}