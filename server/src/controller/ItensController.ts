import { Request, Response } from 'express';
import Knex from '../database/connection';

class ItensController {
    async index (request: Request, response: Response) {
        const itens = await Knex('itens').select('*');
        const serializedItens = itens.map(item => {
            return {
                id: item.id,
                nome: item.nome,
                caminho_imagem: `http://192.168.0.2:3333/uploads/${item.caminho_imagem}`
            };
        });
        return response.json(serializedItens);
    }
}

export default ItensController;