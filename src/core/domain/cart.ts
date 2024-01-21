import {User} from "./user";
import {Product} from "./product";

export interface Cart {
    id: string;
    user: User;
    products: Array<Product>;
    totalValue: number;
    status: string;
    payment: boolean;
}