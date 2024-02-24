"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connect_1 = require("../driven/infra/db-connect");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routers_1 = require("./routers");
const swagger_json_1 = __importDefault(require("../../../public/swagger.json"));
const app = (0, express_1.default)();
const port = 8000;
(0, db_connect_1.connectToDataBase)()
    .then(() => {
    app.use('/', routers_1.routes);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
