import { ProductDTO } from "./product.dto";
import { UserDTO } from "./user.dto";

export type NewCartDTO = {
    user: UserDTO;
    products: Array<ProductDTO>;
    totalValue: number;
    status: string;
    payment: boolean;
}


export type CartDTO = {
    id: string;
    user: UserDTO;
    products: Array<ProductDTO>;
    totalValue: number;
    status: string;
    payment: boolean;
}