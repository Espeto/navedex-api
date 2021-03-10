import { getCustomRepository, In } from 'typeorm';

import Project from '../models/Project';

import NaversRepository from '../repositories/NaversRepository';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  owner_id: number;
  name: string;
  naversIds: Array<number>;
}

class CreateProjectService {
  public async execute({
    owner_id,
    name,
    naversIds,
  }: Request): Promise<Project> {
    const projectsRepository = getCustomRepository(ProjectsRepository);
    const naversRepository = getCustomRepository(NaversRepository);

    const navers = await naversRepository.find({
      where: {
        owner_id,
        id: In(naversIds),
      },
    });

    const project = projectsRepository.create({
      owner_id,
      name,
      navers,
    });

    await projectsRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
