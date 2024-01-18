export interface Produto {
    id: string;
    name: string;
    opcoes: Array<string>;
    preco: number;
    categoria:string;
    status: boolean;
}