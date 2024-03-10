"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Restaurante Project',
        description: 'Pos Tech FIAP'
    },
    servers: [
        {
            url: 'http://localhost:8000',
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
