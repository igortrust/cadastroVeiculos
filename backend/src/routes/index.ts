import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json"


import veiculoRoutes from "./veiculoRoutes";

const routes = Router();

routes.use(veiculoRoutes)
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;