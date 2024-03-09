import { OrderDTO } from "../../common/dtos/order.dto";
import { OrderEntity } from "../../core/entities/order";

export class OrderPresenter {
    static toDTO(
        order: OrderEntity
    ): OrderDTO {
        let dto: OrderDTO = {
            id: order.id,
            idCart: order.idCart,
            receiveDate: order.receiveDate,
            deliveryTime: order.deliveryTime,
            status: order.status
        };
        return dto;
    }
}
