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
exports.cartController = void 0;
class cartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartService.createCart();
            res.status(200).json(cart);
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCart = req.params.id;
            const idUser = req.query.user;
            const cart = yield this.cartService.addUser(idCart, idUser);
            res.status(200).json(cart);
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCart = req.params.id;
            const idProduct = req.query.product;
            const cart = yield this.cartService.addProduct(idCart, idProduct);
            res.status(200).json(cart);
        });
    }
    personalizeItens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const product = req.query.product;
            const options = req.query.options;
            const cart = yield this.cartService.personalizeItem(id, product, options);
            res.status(200).json(cart);
        });
    }
    resumeCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cart = yield this.cartService.resumeCart(id);
            res.status(200).json(cart);
        });
    }
    closeCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cart = yield this.cartService.closeCart(id);
            res.status(200).json(cart);
        });
    }
    payCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cart = yield this.cartService.payCart(id);
            res.status(200).json(cart);
        });
    }
    sendToKitchen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cartSended = yield this.cartService.sendToKitchen(id);
            if (cartSended) {
                res.status(200).json("Pedido enviado a cozinha");
            }
            else {
                res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
            }
        });
    }
    cancelCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cart = yield this.cartService.cancelCart(id);
            res.status(200).json(cart);
        });
    }
}
exports.cartController = cartController;
