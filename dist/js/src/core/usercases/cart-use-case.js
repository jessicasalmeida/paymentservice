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
exports.CartUseCase = void 0;
const cart_1 = require("../entities/cart");
const generators_1 = require("../../common/helpers/generators");
class CartUseCase {
    static createCart(cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = new cart_1.CartEntity((0, generators_1.generateRandomString)(), {}, [], 0, "OPEN", false);
            const cart = yield cartGateway.createcart(newCart);
            if (cart) {
                return cart;
            }
            else {
                return null;
            }
        });
    }
    static addUser(idCart, idUser, cartGateway, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(idCart);
            if (cart) {
                const user = yield userGateway.getUserById(idUser);
                if (user) {
                    cart.user = user;
                }
                else {
                    throw new Error("Não foi possivel add o user no cart: Usuário: " + idUser);
                }
                return cartGateway.update(idCart, cart);
            }
            else {
                return null;
            }
        });
    }
    static addProduct(idCart, idProduct, cartGateway, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(idCart);
            if (cart) {
                let product = yield productGateway.getOne(idProduct);
                if (product) {
                    product.price = CartUseCase.calculateProductPrice(cart.products, product, cartGateway);
                    const newProducts = cart.products;
                    newProducts.push(product);
                    let valorTotal = CartUseCase.calculateTotalValue(newProducts, cartGateway);
                    cart.products = newProducts;
                    cart.totalValue = valorTotal;
                    return cartGateway.update(idCart, cart);
                }
            }
            return null;
        });
    }
    static personalizeItem(idCart, idProduct, options, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(idCart);
            if (cart) {
                let listProducts = cart.products;
                let products = listProducts.find((u) => {
                    return u.id == idProduct;
                });
                if (!products) {
                    throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
                }
                const indexProduct = listProducts.indexOf(products);
                products.options = options;
                listProducts[indexProduct] = products;
                cart.products = listProducts;
                return cartGateway.update(idCart, cart);
            }
            return null;
        });
    }
    static resumeCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                return cart;
            }
            return null;
        });
    }
    static closeCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                cart.status = "CLOSED";
                return cartGateway.update(id, cart);
            }
            return null;
        });
    }
    static payCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                cart.payment = true;
                return cartGateway.update(id, cart);
            }
            return null;
        });
    }
    static sendToKitchen(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                if (cart.payment) {
                    cart.status = "SENDED";
                    yield cartGateway.update(id, cart);
                    return true;
                }
            }
            return false;
        });
    }
    static cancelCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                cart.status = "CANCELLED";
                return cartGateway.update(id, cart);
            }
            return null;
        });
    }
    static findOne(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(id);
            if (cart) {
                return cart;
            }
            return null;
        });
    }
    static calculateTotalValue(productsList, cartGateway) {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }
    static calculateProductPrice(productsList, product, cartGateway) {
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
exports.CartUseCase = CartUseCase;
