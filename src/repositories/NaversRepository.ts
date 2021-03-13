import { format, add } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

import Naver from '../models/Naver';

interface Filter {
  owner_id: number;
  name?: string;
  company_time?: string;
  job_role?: string;
}

interface FindIdRequest {
  owner_id: number;
  id: string;
}

@EntityRepository(Naver)
class NaversRepository extends Repository<Naver> {
  public async filterNavers({
    owner_id,
    name,
    company_time,
    job_role,
  }: Filter): Promise<Naver[] | null> {
    const filteredQuery = this.createQueryBuilder(
      'navers',
    ).where('navers.owner_id = :owner_id', { owner_id });

    if (name) {
      filteredQuery.andWhere('navers.name ilike :name', { name: `%${name}%` });
    }

    if (job_role) {
      filteredQuery.andWhere('navers.job_role = :job_role', { job_role });
    }

    if (company_time) {
      const getDate = add(new Date(), {
        months: parseInt(company_time, 10) * -1,
      });

      const parsedDate = format(getDate, 'yyyy-MM-dd');

      filteredQuery.andWhere('navers.admission_date >= :company_time', {
        company_time: parsedDate,
      });
    }

    const findNavers = await filteredQuery.getMany();

    return findNavers || null;
  }

  public async findNaverById({
    owner_id,
    id,
  }: FindIdRequest): Promise<Naver | null> {
    const findNaver = await this.findOne({
      where: {
        owner_id,
        id,
      },
      relations: ['projects'],
    });

    return findNaver || null;
  }
}

export default NaversRepository;
