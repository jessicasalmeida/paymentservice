export class ProductEntity {
    id: string;
    name: string;
    options: Array<string>;
    price: number;
    timeToPrepare: number;
    category: string;
    status: boolean;

    constructor(
        id: string,
        name: string,
        options: Array<string>,
        price: number,
        timeToPrepare: number,
        category: string,
        status: boolean,

    ) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.price = price;
        this.timeToPrepare = timeToPrepare;
        this.category = category;
        this.status = status;
    }
}
