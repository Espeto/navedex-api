import { getCustomRepository, In } from 'typeorm';

import AppError from '../errors/AppError';

import Project from '../models/Project';
import ProjectsRepository from '../repositories/ProjectsRepository';
import NaversRepository from '../repositories/NaversRepository';

interface Request {
  owner_id: number;
  id: string;
  name?: string;
  naversIds?: Array<number>;
}

class UpdateProjectService {
  public async execute({
    owner_id,
    id,
    name,
    naversIds,
  }: Request): Promise<Project> {
    const projectsRepository = getCustomRepository(ProjectsRepository);
    const naversRepository = getCustomRepository(NaversRepository);

    const project = await projectsRepository.findProjectById({ owner_id, id });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (name) {
      project.name = name;
    }
    if (naversIds) {
      const navers = await naversRepository.find({
        where: {
          owner_id,
          id: In(naversIds),
        },
      });

      if (navers) {
        project.navers = navers;
      }
    }

    await projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
