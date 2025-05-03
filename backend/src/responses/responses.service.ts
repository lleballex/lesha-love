import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { VacancyStatus } from '@/vacancies/entities/vacancy.entity'
import { VacanciesService } from '@/vacancies/vacancies.service'
import { UsersService } from '@/users/users.service'

import { Response } from './entities/response.entity'

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepo: Repository<Response>,

    private readonly vacanciesService: VacanciesService,
    private readonly usersService: UsersService,
  ) {}

  async findMy({ userId, vacancyId }: { userId: string; vacancyId: string }) {
    const user = await this.usersService.findOne(userId)
    const vacancy = await this.vacanciesService.findOne(vacancyId)

    if (!user.candidate) {
      throw new ForbiddenException('User must have filled candidate profile')
    }

    return this.responsesRepo.findOneOrFail({
      where: {
        candidate: { id: user.candidate.id },
        vacancy: { id: vacancy.id },
      },
    })
  }

  async createMy({ userId, vacancyId }: { userId: string; vacancyId: string }) {
    const user = await this.usersService.findOne(userId)
    const vacancy = await this.vacanciesService.findOne(vacancyId)

    if (!user.candidate) {
      throw new ForbiddenException('User must have filled candidate profile')
    }

    if (vacancy.status !== VacancyStatus.Active) {
      throw new ForbiddenException('Vacancy is not active')
    }

    const existingResponse = await this.responsesRepo.findOneBy({
      candidate: { id: user.candidate.id },
      vacancy: { id: vacancy.id },
    })

    if (existingResponse) {
      throw new ConflictException('You have already responded to this vacancy')
    }

    const response = this.responsesRepo.create({
      candidate: { id: user.candidate.id },
      vacancy: { id: vacancy.id },
    })

    return this.responsesRepo.save(response)
  }
}
