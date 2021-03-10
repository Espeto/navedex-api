import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateNaverService from '../services/CreateNaverService';
import UpdateNaverService from '../services/UpdateNaverService';
import DeleteNaverService from '../services/DeleteNaverService';

import NaversRepository from '../repositories/NaversRepository';

const naversRouter = Router();
naversRouter.use(ensureAuthenticated);

naversRouter.get('/', async (request, response) => {
  const { name, company_time, job_role } = request.query;

  const owner_id = request.user.id;

  const naversRepository = getCustomRepository(NaversRepository);

  const navers = await naversRepository.filterNavers({
    owner_id,
    name: name as string,
    company_time: company_time as string,
    job_role: job_role as string,
  });

  return response.json(navers);
});

naversRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const owner_id = request.user.id;

  const naversRepository = getCustomRepository(NaversRepository);

  const naver = await naversRepository.findNaverById({ owner_id, id });

  return response.json(naver);
});

naversRouter.post('/', async (request, response) => {
  const { name, birthdate, admission_date, job_role, projects } = request.body;
  const owner_id = request.user.id;

  const createNaverService = new CreateNaverService();

  const naver = await createNaverService.execute({
    name,
    birthdate,
    admission_date,
    job_role,
    projectsId: projects,
    owner_id,
  });

  return response.json(naver);
});

naversRouter.put('/:id', async (request, response) => {
  const { name, birthdate, admission_date, job_role, projects } = request.body;
  const { id } = request.params;
  const owner_id = request.user.id;

  const updateNaverService = new UpdateNaverService();

  const naver = await updateNaverService.execute({
    owner_id,
    id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  });

  return response.json(naver);
});

naversRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const owner_id = request.user.id;

  const deleteNaverService = new DeleteNaverService();

  await deleteNaverService.execute({ owner_id, id });

  return response.status(204).send();
});

export default naversRouter;
