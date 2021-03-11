import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateProjectService from '../services/CreateProjectService';
import UpdateProjectService from '../services/UpdateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';

import ProjectsRepository from '../repositories/ProjectsRepository';

const projectsRouter = Router();
projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/', async (request, response) => {
  const { name } = request.query;
  const owner_id = request.user.id;

  const projectsRepository = getCustomRepository(ProjectsRepository);

  const projects = await projectsRepository.filterProjects({
    name: name as string,
    owner_id,
  });

  return response.json(projects);
});

projectsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const owner_id = request.user.id;

  const projectsRepository = getCustomRepository(ProjectsRepository);

  const project = await projectsRepository.findProjectById({ owner_id, id });

  return response.json(project);
});

projectsRouter.post('/', async (request, response) => {
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

projectsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, navers } = request.body;
  const owner_id = request.user.id;

  const updateProjectService = new UpdateProjectService();

  const project = await updateProjectService.execute({
    owner_id,
    id,
    name,
    naversIds: navers,
  });

  return response.json(project);
});

projectsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const owner_id = request.user.id;

  const deleteProjectService = new DeleteProjectService();

  await deleteProjectService.execute({ owner_id, id });

  return response.status(204).send();
});

export default projectsRouter;
