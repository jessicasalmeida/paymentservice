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
exports.ProductController = void 0;
const product_use_case_1 = require("../../core/usercases/product-use-case");
const product_1 = require("../gateways/product");
const product_2 = require("../presenters/product");
const order_1 = require("../gateways/order");
const cart_1 = require("../gateways/cart");
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    static getProductById(id, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.findProductById(id, productGateway);
            if (!product) {
                return null;
            }
            return product_2.ProductPresenter.toDTO(product);
        });
    }
    static getProductByCategory(category, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.findProductByCategory(category, productGateway);
            if (!product) {
                return null;
            }
            const productDTO = new Array();
            product.forEach(element => {
                productDTO.push(product_2.ProductPresenter.toDTO(element));
            });
            return productDTO;
        });
    }
    static createProduct(newProductDTO, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.createProduct(newProductDTO.name, newProductDTO.options, newProductDTO.price, newProductDTO.timeToPrepare, newProductDTO.category, newProductDTO.status, productGateway);
            if (product) {
                return product_2.ProductPresenter.toDTO(product);
            }
            return null;
        });
    }
    static deleteProductById(id, productDataSource, orderDataSource, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            const orderGateway = new order_1.OrderGateway(orderDataSource);
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            return product_use_case_1.ProductUseCase.deleteProduct(id, productGateway, orderGateway, cartGateway);
        });
    }
    static updateProductById(id, newProductDTO, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.updateProduct(id, newProductDTO.name, newProductDTO.options, newProductDTO.price, newProductDTO.timeToPrepare, newProductDTO.category, newProductDTO.status, productGateway);
            if (!product) {
                return null;
            }
            return product_2.ProductPresenter.toDTO(product);
        });
    }
    static deactivateProductById(id, productDataSource, orderDataSource, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            const orderGateway = new order_1.OrderGateway(orderDataSource);
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            return product_use_case_1.ProductUseCase.deactivateProduct(id, productGateway, orderGateway, cartGateway);
        });
    }
    static getActiveProducts(productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = product_use_case_1.ProductUseCase.getActiveProducts(productGateway);
            if (!product) {
                return null;
            }
            const productDTO = new Array();
            product.forEach(element => {
                productDTO.push(product_2.ProductPresenter.toDTO(element));
            });
            return productDTO;
        });
    }
    static getAllProducts(productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.getAllProducts(productGateway);
            if (!product) {
                return null;
            }
            const productDTO = new Array();
            product.forEach(element => {
                productDTO.push(product_2.ProductPresenter.toDTO(element));
            });
            return productDTO;
        });
    }
}
exports.ProductController = ProductController;
