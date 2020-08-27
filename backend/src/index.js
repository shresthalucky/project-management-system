import './env';
import express from 'express';

import ApiRoutes from './api.routes';
import { handleError, handleNotFound } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use('/api', ApiRoutes);
app.use(handleError, handleNotFound);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log('listening...');
});
