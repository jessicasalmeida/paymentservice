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
exports.ProductUseCase = void 0;
const generators_1 = require("../../common/helpers/generators");
const product_1 = require("../entities/product");
class ProductUseCase {
    static findProductByCategory(id, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products.filter((p) => p.category === id);
            }
            return null;
        });
    }
    static findProductById(id, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = productGateway.getOne(id);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static createProduct(name, options, price, timeToPrepare, category, status, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const novoId = (0, generators_1.generateRandomString)();
            const nProduct = new product_1.ProductEntity(novoId, name, options, price, timeToPrepare, category, status);
            const product = productGateway.createProduct(nProduct);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static deleteProduct(id, productGateway, orderGateway, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductUseCase.findProductById(id, productGateway);
            if (!(yield ProductUseCase.verifyActiveOrder(id, productGateway, orderGateway, cartGateway))) {
                yield productGateway.delete(id);
                return true;
            }
            else {
                return false;
            }
        });
    }
    static updateProduct(id, name, options, price, timeToPrepare, category, status, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const nProduct = new product_1.ProductEntity(id, name, options, price, timeToPrepare, category, status);
            const product = productGateway.update(id, nProduct);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static deactivateProduct(id, productGateway, orderGateway, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productGateway.getOne(id);
            if (product) {
                if (!(yield ProductUseCase.verifyActiveOrder(id, productGateway, orderGateway, cartGateway))) {
                    product.status = false;
                    yield productGateway.update(id, product);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    static getActiveProducts(productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products.filter((p) => p.status === true);
            }
            return null;
        });
    }
    static getAllProducts(productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products;
            }
            return null;
        });
    }
    static verifyActiveOrder(id, productGateway, orderGateway, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield orderGateway.getAll();
            if (orders) {
                let products = {};
                for (const order of orders) {
                    const cart = (yield cartGateway.getOne(order.idCart));
                    if (cart) {
                        products = cart.products;
                        products = products.filter((p) => p.id === id);
                        if (products.length > 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }
}
exports.ProductUseCase = ProductUseCase;
