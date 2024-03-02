export interface ProductRequestModel {
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}

export interface ProductResponseModel {
    _id?: string;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category:string;
    status: boolean;
}