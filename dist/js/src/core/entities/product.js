"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(id, name, options, price, timeToPrepare, category, status) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.price = price;
        this.timeToPrepare = timeToPrepare;
        this.category = category;
        this.status = status;
    }
}
exports.ProductEntity = ProductEntity;
