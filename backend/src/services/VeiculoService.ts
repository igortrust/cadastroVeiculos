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
            console.log("🚀 ~ file: VeiculoService.ts:16 ~ VeiculoService ~ getVeiculos ~ error:", error)
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
            console.log("🚀 ~ file: VeiculoService.ts:28 ~ VeiculoService ~ insertVeiculo ~ error:", error)
            throw error;
        }
    }
    
}