import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Vacancy } from './entities/vacancy.entity'

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacanciesRepo: Repository<Vacancy>,
  ) {}

  findAll() {
    return this.vacanciesRepo.find()
  }
}
