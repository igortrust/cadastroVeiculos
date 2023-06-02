import { Request, Response, NextFunction } from "express";
import veiculosService from "../services/VeiculoService";
const validateVeiculo = (req: Request, res: Response, next: NextFunction) => {
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    if (!placa) {
        return res.status(400).json({ error: 'O campo placa é obrigatório' });
    }
    if (!chassi) {
        return res.status(400).json({ error: 'O campo chassi é obrigatório' });
    }
    if (!renavam) {
        return res.status(400).json({ error: 'O campo renavam é obrigatório' });
    }
    if (!modelo) {
        return res.status(400).json({ error: 'O campo modelo é obrigatório' });
    }
    if (!marca) {
        return res.status(400).json({ error: 'O campo marca é obrigatório' });
    }
    if (!ano) {
        return res.status(400).json({ error: 'O campo ano é obrigatório' });
    }
    next();
};

const checkVeiculoExists = async (req: Request, res: Response, next: NextFunction) => {
    const { placa, chassi, renavam } = req.body;
    try {
        const veiculos = await veiculosService.getVeiculos();
        const veiculo = veiculos.find((veiculo: { placa: string; chassi: string; renavam: string; }) => veiculo.placa === placa || veiculo.chassi === chassi || veiculo.renavam === renavam);
        if (veiculo) {
            return res.status(400).json({ error: 'Já existe um veículo com a placa, chassi ou renavam informados' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export { validateVeiculo, checkVeiculoExists };