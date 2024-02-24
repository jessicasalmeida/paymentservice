import {connectToDataBase} from "./data/data-sources/mongodb/db-connect";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {routes} from "./presentation/routers";
import swaggerOutput from "../public/swagger.json";
import app from "./server";

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