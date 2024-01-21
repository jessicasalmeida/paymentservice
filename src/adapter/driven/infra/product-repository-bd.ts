import {Product} from "../../../core/domain/product";
import {productRepository} from "../../../core/applications/ports/product-repository";
import mongoose from "mongoose";
import {Int32} from "mongodb";

export class productRepositoryBd implements productRepository {

    private readonly produtos: Product[] = [
        { _id: "1", name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { _id: "2", name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { _id: "3", name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true},
        { _id: "4", name: "Coca", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5,  status: true},
        { _id: "5", name: "Agua", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5, status: true},
        { _id: "6", name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida",  timeToPrepare: 5,  price: 10, status: true},
        { _id: "7", name: "Pudim", options: [], category: "sobremesa", price: 10,  timeToPrepare: 2, status: true},
        { _id: "8", name: "Torta de Maça", options: [], category: "sobremesa",  price: 10, timeToPrepare: 2, status: true},
        { _id: "9", name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { _id: "8", name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { _id: "10", name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false},
        { _id: "11", name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { _id: "12", name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { _id: "12", name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15, status: true},
        { _id: "13", name: "Batata", options: [], category: "acompanhamento", price: 10,timeToPrepare: 15, status: true},
    ];

    private readonly productSchema = new mongoose.Schema({
        id: {type:String, required:true},
        name: {type:String, required:true},
        options:{type:Array, required:true},
        category:{type:String, required:true},
        price:{type:Number, required:true},
        status:{type:Boolean, required:true}
    });

    private readonly produtos1 = mongoose.model('produtos', this.productSchema);

    async deleteProduct(product: Product): Promise<Product[]> {
        const index = this.produtos.indexOf(product);
        this.produtos.splice(index, 1)
        return this.produtos;
    }
    async updateProduct(product: Product): Promise<Product> {
        const index = this.produtos.indexOf(await this.findProductById(product._id));
        this.produtos[index] = product;
        return product;
    }

    async getActiveProducts(): Promise<Product[]> {
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


    async findProductById(id: string): Promise<Product> {
        const produto = this.produtos.find((u) => u._id === id);
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }

    async findProductByCategory(category: string): Promise<Product> {
        const produto = this.produtos.find((u) => u.category === category);
        if (!produto) {
            throw new Error(`Produto with category ${category} not found`);
        }
        return produto;
    }

    async getAllProducts(): Promise<Product[]> {
        return this.produtos;
    }

    async createProduct(productBody: Product): Promise<Product> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
       productBody._id = (this.produtos.length).toString();
        this.produtos.push(productBody);
        return productBody;
    }

}