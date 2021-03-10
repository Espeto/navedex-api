import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import NaversRepository from '../repositories/NaversRepository';

interface Request {
  owner_id: number;
  id: string;
}

class DeleteNaverService {
  public async execute({ owner_id, id }: Request): Promise<void> {
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = await naversRepository.findNaverById({ owner_id, id });

    if (!naver) {
      throw new AppError('This Naver dont exist', 404);
    }

    await naversRepository.delete(id);
  }
}

export default DeleteNaverService;
