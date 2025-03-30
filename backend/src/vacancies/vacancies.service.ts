import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'

import { Vacancy } from './entities/vacancy.entity'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacanciesRepo: Repository<Vacancy>,
  ) {}

  findAll() {
    return this.vacanciesRepo.find()
  }

  findOne(id: string) {
    return this.vacanciesRepo.findOneByOrFail({ id })
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
