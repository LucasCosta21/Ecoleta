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

        const pontosSerializados = pontos.map(point => {
            return {
                ...point,
                url_imagem: `http://192.168.0.2:3333/uploads/${point.caminho_imagem}`
            };
        })

        return response.json(pontosSerializados);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;
        const ponto = await Knex('pontos').where('id', id).first();

        if(!ponto) {
            return response.status(400).json({ message: 'Ponto não encontrado.' });
        }

        const pontoSerializado = {
            ...ponto,
            url_imagem: `http://192.168.0.2:3333/uploads/${ponto.caminho_imagem}`
        };

        const itens = await Knex('itens')
            .join('ponto-item', 'itens.id', '=', 'ponto-item.id_item')
            .where('ponto-item.id_ponto', id)
            .select('itens.nome');

        return response.json( { ponto: pontoSerializado, itens } );
    }

    async create(request: Request, response: Response) {
        console.log("chega");
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
            caminho_imagem: request.file.filename,
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

        const pointItens = itens
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((id_item: number) => {
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