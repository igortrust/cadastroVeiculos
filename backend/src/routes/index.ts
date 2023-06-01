import { Router } from "express";

import veiculoRoutes from "./veiculoRoutes";

const routes = Router();

routes.use(veiculoRoutes)

export default routes;