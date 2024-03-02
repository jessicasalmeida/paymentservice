export interface userRequestModel{
    cpf: string;
    name: string;
    email: string;
}

export interface userResponseModel {
    _id?: string;
    cpf: string;
    name: string;
    email: string;
}