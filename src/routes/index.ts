import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/login', sessionsRouter);

export default routes;
