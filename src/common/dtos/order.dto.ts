export type NewOrderDTO = {
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
}

export type OrderDTO = {
    id: string;
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
}