import { Router } from "express";
import { createVeiculo, getAllVeiculos } from "../controllers/VeiculoController";
import { checkVeiculoExists, validateVeiculo } from "../middlewares/veiculo";

const veiculoRoutes = Router();

veiculoRoutes.get('/veiculos', getAllVeiculos);
veiculoRoutes.post('/veiculos',validateVeiculo, checkVeiculoExists, createVeiculo);

export default veiculoRoutes;