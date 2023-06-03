import fs from 'fs';
import { Veiculo } from "../models/veiculo";

const filePath = process.env.VEICULOS_FILE_PATH || 'veiculos.json';

export default class VeiculoService {
    static getVeiculos = async () => {
        try {
            if (!fs.existsSync(filePath)) {
                const veiculos = [];
                for (let i = 0; i < 5; i++) {
                    const veiculo = {
                        "placa": `TEST-${i}${i}${i}${i}`,
                        "chassi": `1234567890123456${i}`,
                        "renavam": `1234567890${i}`,
                        "modelo": "Uno",
                        "marca": "Fiat",
                        "ano": 2021,
                        "id": i
                    }
                    veiculos.push(veiculo);
                }

                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
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
            console.log("🚀 ~ file: VeiculoService.ts:42 ~ VeiculoService ~ deleteVeiculo ~ error:", error)
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
            console.log("🚀 ~ file: VeiculoService.ts:56 ~ VeiculoService ~ updateVeiculo ~ error:", error)
            throw error;
        }
    }
    
}