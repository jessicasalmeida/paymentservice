import {Produto} from "../../../core/domain/produto";
import {ProductRepository} from "../../../core/applications/ports/productRepository";

export class InMemoryProductRepository implements ProductRepository {

    private readonly produtos: Produto[] = [
        { id: "1", name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { id: "2", name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { id: "3", name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true},
        { id: "4", name: "Coca", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5,  status: true},
        { id: "5", name: "Agua", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5, status: true},
        { id: "6", name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida",  timeToPrepare: 5,  price: 10, status: true},
        { id: "7", name: "Pudim", options: [], category: "sobremesa", price: 10,  timeToPrepare: 2, status: true},
        { id: "8", name: "Torta de Maça", options: [], category: "sobremesa",  price: 10, timeToPrepare: 2, status: true},
        { id: "9", name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { id: "8", name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { id: "10", name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false},
        { id: "11", name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { id: "12", name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { id: "12", name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15, status: true},
        { id: "13", name: "Batata", options: [], category: "Acompanhamento", price: 10,timeToPrepare: 15, status: true},

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
    async updateProductById(id: string, newProduct: Produto): Promise<Produto> {
        const produto = this.produtos.find((u) => u.id === id);
        if(!produto)
        {
            throw new Error(`Produto não encontrado para atualização. ID: ${id}`);
        }
        const index = this.produtos.indexOf(produto);
        produto.name = newProduct.name;
        produto.options = newProduct.options;
        produto.category = newProduct.category;
        produto.price = newProduct.price;
        produto.status = newProduct.status;
        this.produtos[index] = produto;
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
        const produto = this.produtos.find((u) => u.category === categoria);
        if (!produto) {
            throw new Error(`Produto with category ${categoria} not found`);
        }
        return produto;
    }

    async getProducts(): Promise<Produto[]> {
        return this.produtos;
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