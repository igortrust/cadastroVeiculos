import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
