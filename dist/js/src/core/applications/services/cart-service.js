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
exports.cartService = void 0;
const mongodb_1 = require("mongodb");
class cartService {
    constructor(cartRepository, productRepository, userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    createCart() {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = {
                _id: new mongodb_1.ObjectId(),
                user: {},
                products: [],
                totalValue: 0,
                status: "OPEN",
                payment: false
            };
            return this.cartRepository.createCart(newCart);
        });
    }
    addUser(idCart, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(idCart);
            cart.user = yield this.userRepository.getUserById(idUser);
            return this.cartRepository.updateCart(cart);
        });
    }
    addProduct(idCart, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(idCart);
            let product = Object.assign({}, yield this.productRepository.findProductById(idProduct));
            product.price = this.calculateProductPrice(cart.products, product);
            const newProducts = cart.products;
            newProducts.push(product);
            let valorTotal = this.calculateTotalValue(newProducts);
            cart.products = newProducts;
            cart.totalValue = valorTotal;
            return this.cartRepository.updateCart(cart);
        });
    }
    personalizeItem(idCart, idProduct, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(idCart);
            let listProducts = cart.products;
            let products = listProducts.find((u) => {
                return u._id.equals(new mongodb_1.ObjectId(idProduct));
            });
            if (!products) {
                throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
            }
            const indexProduct = listProducts.indexOf(products);
            products.options = options;
            listProducts[indexProduct] = products;
            cart.products = listProducts;
            return this.cartRepository.updateCart(cart);
        });
    }
    resumeCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cartRepository.findCartById(id);
        });
    }
    closeCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(id);
            cart.status = "CLOSED";
            return this.cartRepository.updateCart(cart);
        });
    }
    payCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(id);
            cart.payment = true;
            return this.cartRepository.updateCart(cart);
        });
    }
    sendToKitchen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(id);
            if (cart.payment) {
                cart.status = "SENDED";
                yield this.cartRepository.updateCart(cart);
                return true;
            }
            else {
                return false;
            }
        });
    }
    cancelCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findCartById(id);
            cart.status = "CANCELLED";
            return this.cartRepository.updateCart(cart);
        });
    }
    calculateTotalValue(productsList) {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }
    calculateProductPrice(productsList, product) {
        let qtdCombos = productsList.filter(value => value.category == "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;
        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }
}
exports.cartService = cartService;
