export class OrderEntity {
    id: string;
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;

    constructor(
        id: string,
        idCart: string,
        receiveDate: Date,
        deliveryTime: number,
        status: string,
    ) {
        this.id = id;
        this.idCart = idCart;
        this.receiveDate = receiveDate;
        this.deliveryTime = deliveryTime;
        this.status = status;
    }
}