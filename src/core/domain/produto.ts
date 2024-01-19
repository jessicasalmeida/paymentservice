export interface Produto {
    id: string;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}