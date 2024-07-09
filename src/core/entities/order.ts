export class OrderEntity {
    id: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
    cart: Object;

    constructor(
        id: string,
        receiveDate: Date,
        deliveryTime: number,
        status: string,
        cart: Object
    ) {
        this.id = id;
        this.receiveDate = receiveDate;
        this.deliveryTime = deliveryTime;
        this.status = status;
        this.cart = cart;
    }
}