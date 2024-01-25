import product from "../../../core/domain/product";
import {productRepository} from "../../../core/applications/ports/product-repository";
import {ObjectId} from "mongodb";
import {collections} from "./db-connect";

export class productRepositoryBd implements productRepository {

    private produtos: product[] = [
        { _id: new ObjectId(), name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { _id: new ObjectId(), name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { _id: new ObjectId(), name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true},
        { _id: new ObjectId(), name: "Coca", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5,  status: true},
        { _id: new ObjectId(), name: "Agua", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5, status: true},
        { _id: new ObjectId(), name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida",  timeToPrepare: 5,  price: 10, status: true},
        { _id: new ObjectId(), name: "Pudim", options: [], category: "sobremesa", price: 10,  timeToPrepare: 2, status: true},
        { _id: new ObjectId(), name: "Torta de Maça", options: [], category: "sobremesa",  price: 10, timeToPrepare: 2, status: true},
        { _id: new ObjectId(), name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { _id: new ObjectId(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { _id: new ObjectId(), name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false},
        { _id: new ObjectId(), name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { _id: new ObjectId(), name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { _id: new ObjectId(), name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15, status: true},
        { _id: new ObjectId(), name: "Batata", options: [], category: "acompanhamento", price: 10,timeToPrepare: 15, status: true},
    ];

    async deleteProduct(product: product): Promise<product[]> {
        const query = { _id: new ObjectId(product._id)};
        await collections.product?.deleteOne(query);
        return this.getActiveProducts();
    }
    async updateProduct(product: product): Promise<product> {
        const query = { _id: new ObjectId(product._id)};
        await collections.product?.updateOne(query, {$set:product});
        return product;
    }

    async getActiveProducts(): Promise<product[]> {
        const query = { status: true};
        const produto = await collections.product?.find(query).toArray() as product[];
        if(!produto){
            throw new Error(`Não há produto ativos`);
        }
        return produto;
    }


    async findProductById(id: string): Promise<product> {
        const query = { _id: new ObjectId(id)};
        const produto = await collections.product?.findOne(query);
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }
    async findProductByCategory(category: string): Promise<product[]> {
        const query = { category: category};
        const produto = await collections.product?.find(query).toArray() as product[];
        if (!produto) {
            throw new Error(`Produto with category ${category} not found`);
        }
        return produto;
    }

    async getAllProducts(): Promise<product[]> {
        if(this.produtos.length >0) {
            await collections.product?.insertMany(this.produtos);
            this.produtos = {} as product[];
        }
        return await collections.product?.find({}).toArray() as product[];
    }

    async createProduct(productBody: product): Promise<product> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
        await collections.product?.insertOne(productBody);
        return productBody;
    }

}