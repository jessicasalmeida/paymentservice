export class PagamentoEntity {
    id: string;
    status: boolean;
    cart: Object;

    constructor(
        id: string,
        status: boolean,
        cart: Object
    ) {
        this.id = id;
        this.status = status;
        this.cart = cart;
    }
}