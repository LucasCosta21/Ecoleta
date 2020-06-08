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
    pontosController.create
);

export default routes;