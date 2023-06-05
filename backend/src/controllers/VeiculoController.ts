import { Request, Response } from "express";
import { Veiculo } from '../models/veiculo';
import veiculosService from '../services/VeiculoService';

export const getAllVeiculos = async (req: Request, res: Response) => {
    try {

        const veiculos = await veiculosService.getVeiculos();
        if (veiculos.length === 0) {
            return res.status(204).json();
        }
        return res.status(200).json(veiculos);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const createVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo: Veiculo = req.body;
        const veiculoSalvo = await veiculosService.insertVeiculo(veiculo);
        return res.status(201).json(veiculoSalvo);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteVeiculo = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);
        await veiculosService.deleteVeiculo(id);
        return res.status(200).json({ message: `Veículo com id ${id} deletado com sucesso!` });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateVeiculo = async (req: Request, res: Response) => { 
    try {
        const id = Number(req.params.id);
        const veiculo: Veiculo = req.body;
        veiculo.id = Number(id);
        await veiculosService.updateVeiculo(id, veiculo);
            return res.status(200).json({ message: `Veículo com id ${id} atualizado com sucesso!` });
    } catch (error: any) {
        if (error.message === 'Veículo não encontrado') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
};
