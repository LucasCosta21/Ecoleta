import { Request, Response } from 'express';
import Knex from '../database/connection';

class PontosController{
    async index(request: Request, response: Response) {
        const { cidade, uf, itens } = request.query;
        const parsedItens = String(itens)
            .split(',')
            .map(item => Number(item.trim()));
        const pontos = await Knex('pontos')
            .join('ponto-item', 'pontos.id', '=', 'ponto-item.id_ponto')
            .whereIn('ponto-item.id_item', parsedItens)
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('pontos.*');

        return response.json(pontos);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;
        const ponto = await Knex('pontos').where('id', id).first();

        if(!ponto) {
            return response.status(400).json({ message: 'Ponto não encontrado.' });
        }

        const itens = await Knex('itens')
            .join('ponto-item', 'itens.id', '=', 'ponto-item.id_item')
            .where('ponto-item.id_ponto', id)
            .select('itens.nome');

        return response.json( { ponto, itens } );
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            email,
            numero,
            latitude,
            longitude,
            cidade,
            uf,
            itens
        } = request.body;

        const trx = await Knex.transaction();
        const ponto = {
            caminho_imagem: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
            nome,
            email,
            numero,
            latitude,
            longitude,
            cidade,
            uf
        };

        const insertedIds = await trx('pontos').insert(ponto);

        const id_ponto = insertedIds[0];

        const pointItens = itens.map((id_item: number) => {
            return {
                id_item,
                id_ponto
            };
        });
        await trx('ponto-item').insert(pointItens);
        await trx.commit();
        return response.json({
            id: id_ponto,
            ...ponto
        });
    }
}

export default PontosController;