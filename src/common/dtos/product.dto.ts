export type NewProductDTO = {
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}

export type ProductDTO = {
    id: string;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}