import { EntityRepository, Repository } from 'typeorm';

import Project from '../models/Project';

interface Filter {
  owner_id: number;
  name?: string;
}

interface FindIdRequest {
  owner_id: number;
  id: string;
}

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
  public async filterProjects({
    owner_id,
    name,
  }: Filter): Promise<Project[] | null> {
    const filteredQuery = this.createQueryBuilder(
      'projects',
    ).where('projects.owner_id = :owner_id', { owner_id });

    if (name) {
      filteredQuery.andWhere('projects.name = :name', { name });
    }

    const findProjects = await filteredQuery.getMany();

    return findProjects || null;
  }

  public async detailProjectById({
    owner_id,
    id,
  }: FindIdRequest): Promise<Project | null> {
    const findProject = await this.findOne({
      where: {
        owner_id,
        id,
      },
      relations: ['navers'],
    });

    return findProject || null;
  }
}

export default ProjectsRepository;
