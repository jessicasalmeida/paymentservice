import {User} from "./user";
import {Produto} from "./produto";

export interface Cart {
    id: string;
    user: User;
    produtosList: Array<Produto>;
    observacoes: String;
    valorTotal: number;
    status: string;
    pago: boolean;
}