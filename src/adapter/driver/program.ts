import express from "express";
import {connectToDataBase} from "../driven/infra/db-connect";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {routes} from "./routers";
import swaggerOutput from "../../../public/swagger.json";

const app = express();
const port = 8000;

connectToDataBase()
    .then(()=> {
        app.use('/', routes);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        });
    })

.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});