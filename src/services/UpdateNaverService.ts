import { getRepository, getCustomRepository, In } from 'typeorm';

import Naver from '../models/Naver';
import NaversRepository from '../repositories/NaversRepository';

import Project from '../models/Project';

import AppError from '../errors/AppError';

interface Request {
  owner_id: number;
  id: string;
  name?: string;
  birthdate?: Date;
  admission_date?: Date;
  job_role?: string;
  projects?: Array<number>;
}

class UpdateNaverService {
  public async execute({
    owner_id,
    id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: Request): Promise<Naver> {
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = await naversRepository.findById({ owner_id, id });

    if (!naver) {
      throw new AppError('Naver not found', 404);
    }

    if (name) {
      naver.name = name;
    }
    if (birthdate) {
      naver.birthdate = birthdate;
    }
    if (admission_date) {
      naver.admission_date = admission_date;
    }
    if (job_role) {
      naver.job_role = job_role;
    }
    if (projects) {
      const projectsRepository = getRepository(Project);

      const projectsId: Project[] = await projectsRepository.find({
        where: {
          id: In(projects),
          owner_id,
        },
      });

      if (projectsId) {
        naver.projects = projectsId;
      }
    }

    await naversRepository.save(naver);

    return naver;
  }
}

export default UpdateNaverService;
