import {Produto} from "../../../core/domain/produto";
import {ProductRepository} from "../../../core/applications/ports/productRepository";

export class InMemoryProductRepository implements ProductRepository {

    private readonly produtos: Produto[] = [
        { id: "1", name: "Big Mac", opcoes: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], categoria: "Lanche", preco: "10", status: true},
        { id: "2", name: "Big Tasty", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], categoria: "Lanche", preco: "10", status: true},
        { id: "3", name: "Quarteirao", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], categoria: "Lanche", preco: "10", status: true},
        { id: "4", name: "Coca", opcoes: ['Gelo'], categoria: "Bebida", preco: "10", status: true},
        { id: "5", name: "Agua", opcoes: ['Gelo'], categoria: "Bebida", preco: "10", status: true},
        { id: "6", name: "Suco", opcoes: ['Gelo', 'Acucar'], categoria: "Bebida", preco: "10", status: true},
        { id: "7", name: "Pudim", opcoes: [], categoria: "Sobremesa", preco: "10", status: true},
        { id: "8", name: "Torta de Maça", opcoes: [], categoria: "Sobremesa", preco: "10", status: true},
        { id: "9", name: "Sorvete de Baunilha", opcoes: [], categoria: "Sobremesa", preco: "10", status: true},
        { id: "10", name: "Sorvete de Chocolate", opcoes: [], categoria: "Sobremesa", preco: "10", status: false},
        { id: "11", name: "Combo Big Mac + Bebida + Acompanhamento", opcoes: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], categoria: "Combo", preco: "30", status: true},
        { id: "12", name: "Combo Big Tasty + Bebida + Acompanhamento", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], categoria: "Combo", preco: "30", status: true},
        { id: "12", name: "Combo Quarteirao+ Bebida + Acompanhamento", opcoes: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], categoria: "Combo", preco: "30", status: true},
        { id: "13", name: "Batata", opcoes: [], categoria: "Acompanhamento", preco: "10", status: true},

    ];
    async deleteProductById(id: String): Promise<Produto[]> {
        const produto = this.produtos.find((u) => u.id === id);
       if(!produto)
       {
           throw new Error(`Produto não encontrado para exclusão. ID: ${id}`);
       }
        const index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1)
        return this.produtos;
    }
    async updateProductById(id: string, product: Produto): Promise<Produto> {
        const produto = this.produtos.find((u) => u.id === id);
        if(!produto)
        {
            throw new Error(`Produto não encontrado para atualização. ID: ${id}`);
        }
        const index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1);
        this.produtos.push(product);
        return produto;
    }
    async deactivateProductById(id: string): Promise<Produto> {
        const produto = this.produtos.find((u) => u.id === id);
        if(!produto)
        {
            throw new Error(`Produto não encontrado para atualização. ID: ${id}`);
        }
        produto.status = false;
        const index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1);
        this.produtos.push(produto);
        return produto;
    }

    async getActiveProducts(): Promise<Produto[]> {
        const produto = this.produtos.filter(u => {
            if(u.status)
            {
                return u;
            }
        });
        if(!produto){
            throw new Error(`Não há produto ativos`);
        }
        return produto;
    }


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

    async createProduct(productBody: Produto): Promise<Produto> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
        this.produtos.push(productBody);
        return productBody;
    }

}