import {UserRepository} from "../../../core/applications/ports/userRepository";
import {User} from "../../../core/domain/user";
import {Produto} from "../../../core/domain/produto";

export class InMemoryUserRepository implements UserRepository {
    private readonly users: User[] = [
        { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];

    private readonly produtos: Produto[] = [
        { id: '1', name: 'Coca', preco: '10.00', categoria: 'BEBIDA'},
        { id: '2', name: 'Hamburguer', preco: '20.00', categoria: 'LANCHE'},
        { id: '3', name: 'Sorvete', preco: '5.00', categoria:'SOBREMESA' },
    ];

    async getProductById(id: string): Promise<Produto> {
        const produto = this.produtos.find((u) => u.id === id);
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }

    async getProductByCategory(categoria: string): Promise<Produto> {
        const produto = this.produtos.find((u) => u.categoria === categoria);
        if (!produto) {
            throw new Error(`Produto with category ${categoria} not found`);
        }
        return produto;
    }
    async getUserById(id: string): Promise<User> {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async createProduct(productBody: Produto): Promise<Produto> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
        this.produtos.push(productBody);
        return productBody;
    }

}