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
exports.productService = void 0;
const mongodb_1 = require("mongodb");
class productService {
    constructor(productRepository, orderRepository, cartRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }
    getProductByCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findProductByCategory(id);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findProductById(id);
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.createProduct(product);
        });
    }
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findProductById(id);
            if (!(yield this.verifyActiveOrder(id))) {
                yield this.productRepository.deleteProduct(product);
                return true;
            }
            else {
                return false;
            }
        });
    }
    updateProductById(id, newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const olderProduct = yield this.productRepository.findProductById(id);
            newProduct._id = olderProduct._id;
            return this.productRepository.updateProduct(newProduct);
        });
    }
    deactivateProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findProductById(id);
            if (!(yield this.verifyActiveOrder(id))) {
                product.status = false;
                yield this.productRepository.updateProduct(product);
                return true;
            }
            else {
                return false;
            }
        });
    }
    getActiveProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getActiveProducts();
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.getAllProducts();
        });
    }
    verifyActiveOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idProduct = new mongodb_1.ObjectId(id);
            const orders = yield this.orderRepository.getActiveOrders();
            let products = {};
            for (const order of orders) {
                const cart = (yield this.cartRepository.findCartById(order.idCart));
                products = cart.products.filter((p) => p._id.equals(idProduct));
                if (products.length > 0) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.productService = productService;
