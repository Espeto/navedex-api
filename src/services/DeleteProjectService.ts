import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  owner_id: number;
  id: string;
}

class DeleteProjectService {
  public async execute({ owner_id, id }: Request): Promise<void> {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = await projectsRepository.findProjectById({ owner_id, id });

    if (!project) {
      throw new AppError('Project dont exist', 404);
    }

    await projectsRepository.delete(id);
  }
}

export default DeleteProjectService;
