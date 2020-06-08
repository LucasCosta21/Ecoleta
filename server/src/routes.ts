import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PontosController from './controller/PontosController';
import ItensController from './controller/ItensController';

const routes = express.Router();
const upload = multer(multerConfig);

const pontosController = new PontosController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);

routes.get('/pontos', pontosController.index);
routes.get('/pontos/:id', pontosController.show);
routes.post(
    '/pontos', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email,
            numero: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required().max(2),
            itens: Joi.string().required()
        })
    }),
    pontosController.create
);

export default routes;