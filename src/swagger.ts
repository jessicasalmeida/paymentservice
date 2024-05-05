import swaggerAutogen from 'swagger-autogen';
import * as dotenv from "dotenv";

dotenv.config();

const serverUrl = process.env.URL as string || 'http://localhost:8000';

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

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);