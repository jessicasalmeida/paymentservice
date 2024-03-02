export interface OrderRequestModel {
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
}

export interface OrderResponseModel {
    _id?: string;
    idCart: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
}