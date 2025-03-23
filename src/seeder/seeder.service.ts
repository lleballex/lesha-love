import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@/users/entities/user.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { Response } from '@/responses/entities/response.entity'

import { usersSeed } from './seeds/users.seed'
import { vacanciesSeed } from './seeds/vacancies.seed'
import { responsesSeed } from './seeds/responses.seed'

@Injectable()
export class SeederService {
  private logger: Logger

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    @InjectRepository(Vacancy)
    private readonly vacanciesRepo: Repository<Vacancy>,

    @InjectRepository(Response)
    private readonly responsesRepo: Repository<Response>,
  ) {
    this.logger = new Logger(SeederService.name)
  }

  async seed() {
    if (process.env.IS_SEED_ENABLED === 'true') {
      this.logger.log('Seeding the database started')

      const users = await this.usersRepo.find()

      if (!users.length) {
        this.logger.log('Seeding: users')
        await this.usersRepo.save(usersSeed)
      }

      const vacancies = await this.vacanciesRepo.find()

      if (!vacancies.length) {
        this.logger.log('Seeding: vacancies')
        await this.vacanciesRepo.save(vacanciesSeed)
      }

      const responses = await this.responsesRepo.find()

      if (!responses.length) {
        this.logger.log('Seeding: responses')
        await this.responsesRepo.save(responsesSeed)
      }

      this.logger.log('Seeding the database completed')
    } else {
      this.logger.log('Seeding the database skipped')
    }
  }
}
