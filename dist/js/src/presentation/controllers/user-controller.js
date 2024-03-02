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
exports.userController = void 0;
class userController {
    constructor(createUserUseCase, getOneUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getOneUserUseCase = getOneUserUseCase;
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.getOneUserUseCase.execute(id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).send({ message: "Error fetching data. " + error });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                const user = yield this.createUserUseCase.execute(newUser);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).send({ message: "Error creating data. " + error });
            }
        });
    }
}
exports.userController = userController;
