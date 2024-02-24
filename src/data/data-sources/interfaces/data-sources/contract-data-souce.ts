import { ContactRequestModel, ContactResponseModel } from "../../../domain/models/contact";

export interface ContactDataSource {
    create(contact: ContactRequestModel): void;
    getAll(): Promise<ContactResponseModel[]>;
    deleteOne(id: String): void;
    updateOne(id: String, data: ContactRequestModel): void;
    (id: String): Promise<ContactResponseModel | null>;
}