import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateProjectService from '../services/CreateProjectService';

import ProjectsRepository from '../repositories/ProjectsRepository';

const projectsRouter = Router();
projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/index', async (request, response) => {
  const { name } = request.body;
  const owner_id = request.user.id;

  const projectsRepository = getCustomRepository(ProjectsRepository);

  const projects = projectsRepository.filterProjects({
    name,
    owner_id,
  });

  return response.json(projects);
});

projectsRouter.get('/show/:id', async (request, response) => {
  const { id } = request.params;
  const owner_id = request.user.id;

  const projectsRepository = getCustomRepository(ProjectsRepository);

  const project = projectsRepository.detailProjectById({ owner_id, id });

  return response.json(project);
});

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
