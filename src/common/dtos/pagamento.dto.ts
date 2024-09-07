export type NewPagamentoDTO = {
    status: boolean;
    cart: CartItensDTO;
}

export type PagamentoDTO = {
    id: string;
    status: boolean;
    cart: object;
}

export type CartItensDTO = {
    id: string;
    user: string;
    totalValue: number;
    status: string;
    payment: boolean;
    estimatedTime: number;
    cartItens: ItensDTO[]
}

export type ItensDTO = {
    id: number;
    options: string;
    price: number;
    product: ProductDTO;
}

export type ProductDTO = {
    id: string;
    name: string;
    options: string;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}

export type UserDTO = {
    id: string;
    cpf: string;
    name: string;
    email: string;
    cep: string;
    telefone: string;

}