import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();
const route = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(route);
