import fs from 'fs';
import { Veiculo } from "../models/veiculo";

const filePath = process.env.VEICULOS_FILE_PATH || 'veiculos.json';

export default class VeiculoService {
    static getVeiculos = async () => {
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '[]');
            }
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }

    static insertVeiculo = async (veiculo: Veiculo) => {
        try {
            const veiculos = await this.getVeiculos();
            const ids = veiculos.map((veiculo: { id: number; }) => veiculo.id);
            const maxId = ids.length ? Math.max(...ids) : 0;
            veiculo.id =  maxId + 1 ;
            veiculos.push(veiculo);
            fs.writeFileSync(filePath, JSON.stringify(veiculos));
            return veiculo;
        } catch (error) {
            throw error;
        }
    }

    static deleteVeiculo = async (id: number) => { 
        try {
            const veiculos = await this.getVeiculos();
            const veiculoIndex = veiculos.findIndex((veiculo: { id: number; }) => veiculo.id === id);
            if (veiculoIndex === -1) {
                throw new Error('Veículo não encontrado');
            }
            veiculos.splice(veiculoIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify(veiculos));
            return veiculos;
        } catch (error) {
            throw error;
        }
    }

    static updateVeiculo = async (id: number, veiculo: Veiculo) => { 
        try {
            const veiculos = await this.getVeiculos();
            const veiculoIndex = veiculos.findIndex((veiculo: { id: number; }) => veiculo.id === id);
            if (veiculoIndex === -1) {
                throw new Error('Veículo não encontrado');
            }
            veiculos[veiculoIndex] = veiculo;
            fs.writeFileSync(filePath, JSON.stringify(veiculos));
            return veiculo;
        } catch (error) {
            throw error;
        }
    }
    
}