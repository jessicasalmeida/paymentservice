
import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import ProductDataSource from "../../interfaces/data-sources/product-data-source";
import { ProductRequestModel, ProductResponseModel } from "../../../domain/models/product";

export class ProductRepositoryMongoBd implements ProductDataSource {

    private produtos: ProductRequestModel[] = [
        { name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true},
        { name: "Coca", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5,  status: true},
        { name: "Agua", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5, status: true},
        { name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida",  timeToPrepare: 5,  price: 10, status: true},
        { name: "Pudim", options: [], category: "sobremesa", price: 10,  timeToPrepare: 2, status: true},
        { name: "Torta de Maça", options: [], category: "sobremesa",  price: 10, timeToPrepare: 2, status: true},
        { name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false},
        { name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15, status: true},
        { name: "Batata", options: [], category: "acompanhamento", price: 10,timeToPrepare: 15, status: true},
    ];

    async delete(id: string): Promise<boolean> {
        const query = { _id: new ObjectId(id)};
        try {
            await collections.product?.deleteOne(query);
            return true;
        } catch (error) {
            throw new Error(`Não foi possivel deletar o produto: ` + id);
        }
         return false;
    }
    async update(id: string, product: ProductRequestModel): Promise<ProductResponseModel> {
        const query = { _id: new ObjectId(id)};
        await collections.product?.updateOne(query, {$set:product});
        return product;
    }
    
    async getOne(id: string): Promise<ProductResponseModel> {
        const query = { _id: new ObjectId(id)};
        const produto = await collections.product?.findOne(query) as unknown as ProductResponseModel;
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }

    async getAll(): Promise<ProductResponseModel[]> {
        if(this.produtos.length >0) {
            await collections.product?.insertMany(this.produtos);
            this.produtos = {} as ProductResponseModel[];
        }
        return await collections.product?.find({}).toArray() as unknown as ProductResponseModel[];
    }

    async create(productBody: ProductRequestModel): Promise<ProductResponseModel> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
        await collections.product?.insertOne(productBody);
        return productBody;
    }

}