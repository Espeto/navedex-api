import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateProjectService from '../services/CreateProjectService';

const projectsRouter = Router();
projectsRouter.use(ensureAuthenticated);

projectsRouter.post('/store', async (request, response) => {
  const { name, navers } = request.body;
  const owner_id = request.user.id;

  const createProjectService = new CreateProjectService();

  const project = await createProjectService.execute({
    owner_id,
    name,
    naversIds: navers,
  });

  return response.json(project);
});

export default projectsRouter;
