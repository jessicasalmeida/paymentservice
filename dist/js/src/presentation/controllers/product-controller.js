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
exports.productController = void 0;
class productController {
    constructor(productService) {
        this.productService = productService;
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  #swagger.parameters['$ref'] = ['#/components/parameters/someParameter1', '#/components/parameters/someParameter2'] */
            const id = req.params.id;
            const produto = yield this.productService.getProductById(id);
            res.status(200).json(produto);
        });
    }
    getProductByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = req.params.categoria;
            const produto = yield this.productService.getProductByCategory(categoria);
            res.status(200).json(produto);
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = req.body;
            const product = yield this.productService.createProduct(newProduct);
            res.status(200).json(product);
        });
    }
    deleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const isDelete = yield this.productService.deleteProductById(id);
            if (isDelete) {
                res.status(200).json("Produto deletado com sucesso");
            }
            else {
                res.status(500).json("O produto está em um pedido ativo e não pode ser deletado");
            }
        });
    }
    updateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const newProduct = req.body;
            const product = yield this.productService.updateProductById(id, newProduct);
            res.status(200).json(product);
        });
    }
    deactivateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deactivate = yield this.productService.deactivateProductById(id);
            if (deactivate) {
                res.status(200).json("Produto desativado com sucesso");
            }
            else {
                res.status(500).json("O produto está em um pedido ativo e não pode ser desativado");
            }
        });
    }
    getActiveProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getActiveProducts();
            res.status(200).json(product);
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getAllProducts();
            res.status(200).json(product);
        });
    }
}
exports.productController = productController;
