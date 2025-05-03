import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'

import { Vacancy } from './entities/vacancy.entity'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { FindAllVacanciesDto } from './dto/find-all-vacancies.dto'

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacanciesRepo: Repository<Vacancy>,
  ) {}

  async findAll(dto: FindAllVacanciesDto) {
    const qb = this.vacanciesRepo
      .createQueryBuilder('vacancy')
      .leftJoinAndSelect('vacancy.scope', 'scope')
      .leftJoinAndSelect('vacancy.recruiter', 'recruiter')

    if (dto.query) {
      qb.andWhere('vacancy.title ILIKE :query', { query: `%${dto.query}%` })
    }
    if (dto.scope) {
      qb.andWhere('scope.id = :scopeId', { scopeId: dto.scope })
    }
    if (dto.status) {
      qb.andWhere('vacancy.status = :status', { status: dto.status })
    }

    qb.orderBy('vacancy.createdAt', 'DESC')
      .skip((dto.page - 1) * dto.take)
      .take(dto.take)

    const [data, totalData] = await qb.getManyAndCount()

    return {
      data,
      totalData,
      totalPages: Math.ceil(totalData / dto.take),
    }
  }

  findOne(id: string) {
    return this.vacanciesRepo.findOneOrFail({
      where: { id },
      relations: ['scope', 'recruiter'],
    })
  }

  create(data: Partial<Vacancy>) {
    const vacancy = this.vacanciesRepo.create(data)
    return this.vacanciesRepo.save(vacancy)
  }

  async update(id: string, dto: UpdateVacancyDto) {
    const vacancy = await this.vacanciesRepo.preload({ id, ...dto })

    if (!vacancy) {
      throw new EntityNotFoundError(Vacancy, id)
    }

    return this.vacanciesRepo.save(vacancy)
  }

  async delete(id: string) {
    const vacancy = await this.findOne(id)
    await this.vacanciesRepo.remove(vacancy)
    return vacancy
  }
}
