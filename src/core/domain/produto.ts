export interface Produto {
    id: string;
    name: string;
    opcoes: Array<string>;
    preco: string;
    categoria:string;
    status: boolean;
}