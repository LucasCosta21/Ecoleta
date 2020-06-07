import express from 'express';

import PontosController from './controller/PontosController';
import ItensController from './controller/ItensController';

const routes = express.Router();
const pontosController = new PontosController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);
routes.post('/pontos', pontosController.create);
routes.get('/pontos', pontosController.index);
routes.get('/pontos/:id', pontosController.show);

export default routes;