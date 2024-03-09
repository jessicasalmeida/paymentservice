export class UserEntity {
    public id: string
    public cpf: string;
    public name: string;
    public email: string;

    constructor(
        id: string,
        cpf: string,
        name: string,
        email: string,
    ) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.email = email;
    }

}