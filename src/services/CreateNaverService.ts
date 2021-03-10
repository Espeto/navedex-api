import { getRepository, getCustomRepository, In } from 'typeorm';

import Naver from '../models/Naver';
import Project from '../models/Project';

import NaversRepository from '../repositories/NaversRepository';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  name: string;
  birthdate: Date;
  admission_date: Date;
  job_role: string;
  projectsId: Array<number>;
  owner_id: number;
}

class CreateNaverService {
  public async execute({
    name,
    birthdate,
    admission_date,
    job_role,
    projectsId,
    owner_id,
  }: Request): Promise<Naver> {
    const naversRepository = getCustomRepository(NaversRepository);
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projects: Project[] = await projectsRepository.find({
      where: {
        id: In(projectsId),
        owner_id,
      },
    });

    const naver = naversRepository.create({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
      owner_id,
    });

    await naversRepository.save(naver);

    return naver;
  }
}

export default CreateNaverService;
