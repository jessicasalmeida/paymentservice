"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepositoryBd = void 0;
const mongodb_1 = require("mongodb");
const db_connect_1 = require("./db-connect");
class productRepositoryBd {
    constructor() {
        this.produtos = [
            { _id: new mongodb_1.ObjectId(), name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Coca", options: ['Gelo'], category: "bebida", price: 10, timeToPrepare: 5, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Agua", options: ['Gelo'], category: "bebida", price: 10, timeToPrepare: 5, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida", timeToPrepare: 5, price: 10, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Pudim", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false },
            { _id: new mongodb_1.ObjectId(), name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { _id: new mongodb_1.ObjectId(), name: "Batata", options: [], category: "acompanhamento", price: 10, timeToPrepare: 15, status: true },
        ];
    }
    deleteProduct(product) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(product._id) };
            yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.deleteOne(query));
            return this.getActiveProducts();
        });
    }
    updateProduct(product) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(product._id) };
            yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.updateOne(query, { $set: product }));
            return product;
        });
    }
    getActiveProducts() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { status: true };
            const produto = yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.find(query).toArray());
            if (!produto) {
                throw new Error(`Não há produto ativos`);
            }
            return produto;
        });
    }
    findProductById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const produto = yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.findOne(query));
            if (!produto) {
                throw new Error(`Produto with id ${id} not found`);
            }
            return produto;
        });
    }
    findProductByCategory(category) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = { category: category };
            const produto = yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.find(query).toArray());
            if (!produto) {
                throw new Error(`Produto with category ${category} not found`);
            }
            return produto;
        });
    }
    getAllProducts() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.produtos.length > 0) {
                yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.insertMany(this.produtos));
                this.produtos = {};
            }
            return yield ((_b = db_connect_1.collections.product) === null || _b === void 0 ? void 0 : _b.find({}).toArray());
        });
    }
    createProduct(productBody) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!productBody) {
                throw new Error(`Produto have not been added`);
            }
            yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.insertOne(productBody));
            return productBody;
        });
    }
}
exports.productRepositoryBd = productRepositoryBd;
