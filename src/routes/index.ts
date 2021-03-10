import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import naversRouter from './navers.routes';
import projectsRouter from './projects.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/navers', naversRouter);
routes.use('/projects', projectsRouter);

export default routes;
