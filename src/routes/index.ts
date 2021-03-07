import { Router } from 'express';

import usersRouter from './users.routes';

const routes = Router();

routes.use('/signup', usersRouter);

export default routes;
