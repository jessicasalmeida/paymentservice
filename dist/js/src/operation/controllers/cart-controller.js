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
exports.CartController = void 0;
const cart_use_case_1 = require("../../core/usercases/cart-use-case");
const cart_1 = require("../gateways/cart");
const cart_2 = require("../presenters/cart");
const user_1 = require("../gateways/user");
const product_1 = require("../gateways/product");
class CartController {
    constructor(cartUseCase) {
        this.cartUseCase = cartUseCase;
    }
    static createCart(cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.createCart(cartGateway);
            if (!cart) {
                return null;
            }
            return yield cart_2.CartPresenter.toDTO(cart);
        });
    }
    static addUser(idCart, idUser, cartDataSource, userDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const userGateway = new user_1.UserGateway(userDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.addUser(idCart, idUser, cartGateway, userGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static addProduct(idCart, idUser, cartDataSource, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.addProduct(idCart, idUser, cartGateway, productGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static personalizeItens(idCart, idProduct, options, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.personalizeItem(idCart, idProduct, options, cartGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static resumeCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.resumeCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static closeCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.closeCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static payCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.payCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
    static sendToKitchen(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            return yield cart_use_case_1.CartUseCase.sendToKitchen(id, cartGateway);
        });
    }
    static cancelCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.cancelCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart_2.CartPresenter.toDTO(cart);
        });
    }
}
exports.CartController = CartController;
