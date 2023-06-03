import fs from 'fs';
import { expect } from 'chai';
import { describe } from 'mocha';
import request from 'supertest';
import app from '../app'


describe('Testes unitários para endpoint Veiculos', () => {
    let veiculos: any;
    before(() => {
        if (fs.existsSync('src/tests/veiculosTest.json')) {
            fs.unlinkSync('src/tests/veiculosTest.json');
        }
    });

    after(() => {
        if (fs.existsSync('src/tests/veiculosTest.json')) {
            fs.unlinkSync('src/tests/veiculosTest.json');
        }
    });

    it('Deve retornar um array vazio', async () => {
        veiculos = await request(app).get('/veiculos');
        expect(veiculos.status).to.be.equal(204);
    });

    it('Deve inserir um veículo e retornar um array com um veículo', async () => {
        const veiculo = {
            "placa": "ABC-1234",
            "chassi": "12345678901234567",
            "renavam": "12345678901",
            "modelo": "Uno",
            "marca": "Fiat",
            "ano": 2021
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);

        expect(veiculoSalvo.status).to.be.equal(201);
        expect(veiculoSalvo.body).to.have.property('id');
        expect(veiculoSalvo.body.renavam).to.be.equal(veiculo.renavam);
    });

    it('Deve retornar status 400 por placa não informada', async () => {
        const veiculo = {
            chassi: Math.random().toString(36).substring(2, 5).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
            renavam: Math.random().toString(36).substring(2, 11).toUpperCase(),
            modelo: Math.random().toString(36).substring(2, 5).toUpperCase(),
            marca: Math.random().toString(36).substring(2, 5).toUpperCase(),
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('O campo placa é obrigatório');
    });

    it('Deve retornar status 400 por chassi não informado', async () => {
        const veiculo = {
            placa: Math.random().toString(36).substring(2, 5).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
            renavam: Math.random().toString(36).substring(2, 11).toUpperCase(),
            modelo: Math.random().toString(36).substring(2, 5).toUpperCase(),
            marca: Math.random().toString(36).substring(2, 5).toUpperCase(),
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('O campo chassi é obrigatório');
    });
    
    it('Deve retornar status 400 por renavam não informado', async () => {
        const veiculo = {
            placa: Math.random().toString(36).substring(2, 5).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
            chassi: Math.random().toString(36).substring(2, 11).toUpperCase(),
            modelo: Math.random().toString(36).substring(2, 5).toUpperCase(),
            marca: Math.random().toString(36).substring(2, 5).toUpperCase(),
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('O campo renavam é obrigatório');
    });

    it('Deve retornar status 400 por modelo não informado', async () => {
        const veiculo = {
            placa: Math.random().toString(36).substring(2, 5).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
            chassi: Math.random().toString(36).substring(2, 11).toUpperCase(),
            renavam: Math.random().toString(36).substring(2, 5).toUpperCase(),
            marca: Math.random().toString(36).substring(2, 5).toUpperCase(),
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('O campo modelo é obrigatório');
    });

    it('Deve retornar status 400 por marca não informado', async () => {
        const veiculo = {
            placa: Math.random().toString(36).substring(2, 5).toUpperCase() + '-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
            chassi: Math.random().toString(36).substring(2, 11).toUpperCase(),
            renavam: Math.random().toString(36).substring(2, 5).toUpperCase(),
            modelo: Math.random().toString(36).substring(2, 5).toUpperCase(),
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('O campo marca é obrigatório');
    });

    it('Deve retornar status 200 e um array com um veículo', async () => {
        veiculos = await request(app).get('/veiculos');
        expect(veiculos.status).to.be.equal(200);
        expect(veiculos.body).to.be.an('array');
        expect(veiculos.body.length).to.be.equal(1);
    });

    it('Deve retornar status 400, veículo já existe', async () => {
        const veiculo = {
            "placa": "ABC-1234",
            "chassi": "12345678901234567",
            "renavam": "12345678901",
            "modelo": "Uno",
            "marca": "Fiat",
            "ano": 2021
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);

        expect(veiculoSalvo.status).to.be.equal(400);
        expect(veiculoSalvo.body.error).to.be.equal('Já existe um veículo com a placa, chassi ou renavam informados');
    });

    it('Deve atualizar o veículo e retornar status 200', async () => { 
        const veiculo = {
            "placa": "ABC-1234",
            "chassi": "12345678901234567",
            "renavam": "12345678901",
            "modelo": "Uno",
            "marca": "Fiat",
            "ano": 2021
        };
        const veiculoSalvo = await request(app).put('/veiculos/1').send(veiculo);

        expect(veiculoSalvo.status).to.be.equal(200);
    });

        // Teste para deletar veiculo
    it('Deve deletar o veículo e retornar status 200', async () => {
        // criar veiculo
        const veiculo = {
            "placa": "Delete-1234",
            "chassi": "Delete12345678901234567",
            "renavam": "Delete12345678901",
            "modelo": "Uno",
            "marca": "Fiat",
            "ano": 2021
        };
        const veiculoSalvo = await request(app).post('/veiculos').send(veiculo);
        // deletar veiculo
        const veiculoDeletado = await request(app).delete('/veiculos/2');
        expect(veiculoDeletado.status).to.be.equal(200);
    });
    
    it('Deve retornar status 404, veículo não encontrado', async () => { 
        const veiculo = {
            "placa": "ABC-1234",
            "chassi": "12345678901234567",
            "renavam": "12345678901",
            "modelo": "Uno",
            "marca": "Fiat",
            "ano": 2021
        };
        const veiculoSalvo = await request(app).put('/veiculos/999910').send(veiculo);

        expect(veiculoSalvo.status).to.be.equal(404);
    });


});