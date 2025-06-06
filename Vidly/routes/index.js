import { genresRouter } from '../genres.js';
import { homeRouter } from '../home.js';
import { authenticator } from '../middleware/authenticator.js';
import { log } from '../middleware/logger.js';

import express from 'express';
const routes = express.Router();

routes.use('/api/genres/', authenticator, genresRouter);
routes.use('/', log, homeRouter);

export { routes };