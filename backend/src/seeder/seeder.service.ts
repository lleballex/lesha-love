import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@/users/entities/user.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { Response } from '@/responses/entities/response.entity'
import { Scope } from '@/scopes/entities/scope.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'
import { Candidate } from '@/users/entities/candidate.entity'

import { usersSeed } from './seeds/users.seed'
import { vacanciesSeed } from './seeds/vacancies.seed'
import { responsesSeed } from './seeds/responses.seed'
import { recruitersSeed } from './seeds/recruiters.seed'
import { candidatesSeed } from './seeds/candidates.seed'
import { scopesSeed } from './seeds/scopes.seed'

@Injectable()
export class SeederService {
  private logger: Logger

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    @InjectRepository(Recruiter)
    private readonly recruitersRepo: Repository<Recruiter>,

    @InjectRepository(Candidate)
    private readonly candidatesRepo: Repository<Candidate>,

    @InjectRepository(Scope)
    private readonly scopesRepo: Repository<Scope>,

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

      await this.seedUsers()
      await this.seedRecruiters()
      await this.seedCandidates()
      await this.seedScopes()
      await this.seedVacancies()
      await this.seedResponses()

      this.logger.log('Seeding the database completed')
    } else {
      this.logger.log('Seeding the database skipped')
    }
  }

  private async seedUsers() {
    const users = await this.usersRepo.find()

    if (!users.length) {
      this.logger.log('Seeding: users')
      await this.usersRepo.insert(usersSeed)
    }
  }

  private async seedRecruiters() {
    const recruiters = await this.recruitersRepo.find()

    if (!recruiters.length) {
      this.logger.log('Seeding: recruiters')
      await this.recruitersRepo.insert(recruitersSeed)
    }
  }

  private async seedCandidates() {
    const candidates = await this.candidatesRepo.find()

    if (!candidates.length) {
      this.logger.log('Seeding: candidates')
      await this.candidatesRepo.insert(candidatesSeed)
    }
  }

  private async seedScopes() {
    const scopes = await this.scopesRepo.find()

    if (!scopes.length) {
      this.logger.log('Seeding: scopes')
      await this.scopesRepo.insert(scopesSeed)
    }
  }

  private async seedVacancies() {
    const vacancies = await this.vacanciesRepo.find()

    if (!vacancies.length) {
      this.logger.log('Seeding: vacancies')
      await this.vacanciesRepo.insert(vacanciesSeed)
    }
  }

  private async seedResponses() {
    const responses = await this.responsesRepo.find()

    if (!responses.length) {
      this.logger.log('Seeding: responses')
      await this.responsesRepo.insert(responsesSeed)
    }
  }
}
