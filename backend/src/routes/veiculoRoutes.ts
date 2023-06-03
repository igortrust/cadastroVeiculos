import { Router } from "express";
import { createVeiculo, deleteVeiculo, getAllVeiculos, updateVeiculo } from "../controllers/VeiculoController";
import { checkVeiculoExists, validateVeiculo } from "../middlewares/veiculo";

const veiculoRoutes = Router();

veiculoRoutes.get('/veiculos', getAllVeiculos);
veiculoRoutes.post('/veiculos', validateVeiculo, checkVeiculoExists, createVeiculo);
veiculoRoutes.put('/veiculos/:id', validateVeiculo, updateVeiculo);
veiculoRoutes.delete('/veiculos/:id', deleteVeiculo);

export default veiculoRoutes;