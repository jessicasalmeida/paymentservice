
import {ObjectId} from "mongodb";
import {collections} from "./db-connect";
import { NewProductDTO, ProductDTO } from "../../../common/dtos/product.dto";
import ProductDataSource from "../../../common/interfaces/product-data-source";
import { generateRandomString } from "../../../common/helpers/generators";

export class ProductRepositoryMongoBd implements ProductDataSource {

    private produtos: ProductDTO[] = [
        { id: generateRandomString(), name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { id: generateRandomString(), name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10,  timeToPrepare: 15,  status: true},
        { id: generateRandomString(), name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true},
        { id: generateRandomString(), name: "Coca", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5,  status: true},
        { id: generateRandomString(), name: "Agua", options: ['Gelo'], category: "bebida", price: 10,  timeToPrepare: 5, status: true},
        { id: generateRandomString(), name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida",  timeToPrepare: 5,  price: 10, status: true},
        { id: generateRandomString(), name: "Pudim", options: [], category: "sobremesa", price: 10,  timeToPrepare: 2, status: true},
        { id: generateRandomString(), name: "Torta de Maça", options: [], category: "sobremesa",  price: 10, timeToPrepare: 2, status: true},
        { id: generateRandomString(), name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { id: generateRandomString(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true},
        { id: generateRandomString(), name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false},
        { id: generateRandomString(), name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { id: generateRandomString(), name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30,  timeToPrepare: 15,  status: true},
        { id: generateRandomString(), name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30,  timeToPrepare: 15, status: true},
        { id: generateRandomString(), name: "Batata", options: [], category: "acompanhamento", price: 10,timeToPrepare: 15, status: true},
    ];

    async delete(id: string): Promise<boolean> {
        const query = { id: (id)};
        try {
            await collections.product?.deleteOne(query);
            return true;
        } catch (error) {
            throw new Error(`Não foi possivel deletar o produto: ` + id);
        }
         return false;
    }
    async update(id: string, product: ProductDTO): Promise<ProductDTO> {
        const query = { id: (id)};
        await collections.product?.updateOne(query, {$set:product});
        return product;
    }
    
    async getOne(id: string): Promise<ProductDTO> {
        const query = { id: (id)};
        const produto = await collections.product?.findOne(query) as ProductDTO;
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }
    
    async getAll(): Promise<ProductDTO[]> {
        if(this.produtos.length >0) {
            await collections.product?.insertMany(this.produtos);
            this.produtos = {} as ProductDTO[];
        }
        return await collections.product?.find({}).toArray() as ProductDTO[];
    }

    async create(productBody: ProductDTO): Promise<ProductDTO> {
       if(!productBody)
       {
           throw new Error(`Produto have not been added`);
       }
        await collections.product?.insertOne(productBody);
        return productBody;
    }

}