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
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const serverUrl = process.env.URL || 'http://localhost:8000';
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Restaurante Project',
        description: 'Pos Tech FIAP'
    },
    servers: [
        {
            url: serverUrl,
            description: ''
        },
    ],
    components: {
        schemas: {
            user: {
                $cpf: '000.000.000-00',
                $name: 'Jessica',
                email: 'jessica.jessica@example.com'
            },
            product: {
                $name: 'Sorvete Misto',
                $options: '[Casquina, Massa Mista]',
                $category: 'sobremesa',
                $price: '10',
                $timeToPrepare: '2',
                $status: 'true'
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};
const outputFile = './public/swagger.json';
const endpointsFiles = [
    './src/external/api/routers/index.ts'
];
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
