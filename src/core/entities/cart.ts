import { ProductEntity } from "./product";
import { UserEntity } from "./user";

export class CartEntity {
    id: string;
    user: UserEntity;
    products: Array<ProductEntity>;
    totalValue: number;
    status: string;
    payment: boolean;

    constructor(
        id: string,
        user: UserEntity,
        products: Array<ProductEntity>,
        totalValue: number,
        status: string,
        payment: boolean,
    ) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
    }
}