"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importStar(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const user_repository_mongo_bd_1 = require("../../data/data-sources/mongodb/user-repository-mongo-bd");
const UserRepositoryImpl_1 = __importDefault(require("../../domain/repositories/UserRepositoryImpl"));
const get_one_user_1 = require("../../domain/use-cases/user/get-one-user");
const create_user_1 = require("../../domain/use-cases/user/create-user");
const userRepository = new user_repository_mongo_bd_1.userRepositoryMongoBd();
const userC = new user_controller_1.userController(new create_user_1.createUser(new UserRepositoryImpl_1.default(userRepository)), new get_one_user_1.getOneUser(new UserRepositoryImpl_1.default(userRepository)));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use(express_1.default.json());
exports.userRouter.get('/:id', userC.getUserById.bind(userC));
exports.userRouter.post('/', userC.createUser.bind(userC));
