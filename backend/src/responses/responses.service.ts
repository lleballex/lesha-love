import {
  BadRequestException,
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
import { FindAllResponsesDto } from './dto/find-all-responses.dto'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepo: Repository<Response>,

    private readonly vacanciesService: VacanciesService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(dto: FindAllResponsesDto, userId?: string) {
    if (!dto.byCurCandidate && !dto.byCurRecruiter) {
      throw new BadRequestException(
        'Either "byCurRecruiter" or "byCurCandidate" must be provided',
      )
    }

    let user: User | null = null

    if (userId) {
      user = await this.usersService.findOne(userId)
    }

    const qb = this.responsesRepo
      .createQueryBuilder('response')
      .leftJoinAndSelect('response.vacancy', 'vacancy')
      .leftJoinAndSelect('vacancy.scope', 'vacancy_scope')
      .leftJoinAndSelect('vacancy.recruiter', 'recruiter')
      .leftJoinAndSelect('response.candidate', 'candidate')
      .leftJoinAndSelect('candidate.user', 'candidate_user')

    if (dto.vacancy) {
      qb.andWhere('vacancy.id = :vacancyId', { vacancyId: dto.vacancy })
    }

    if (dto.byCurCandidate) {
      if (!user) {
        throw new ForbiddenException('You must be authorizated')
      }
      if (!user.candidate) {
        throw new ForbiddenException('User must have filled candidate profile')
      }

      qb.andWhere('candidate.id = :candidateId', {
        candidateId: user.candidate.id,
      })
    }

    if (dto.byCurRecruiter) {
      if (!user) {
        throw new ForbiddenException('You must be authorizated')
      }
      if (!user.recruiter) {
        throw new ForbiddenException('User must have filled recruiter profile')
      }

      qb.andWhere('recruiter.id = :recruiterId', {
        recruiterId: user.recruiter.id,
      })
    }

    qb.orderBy('response.createdAt', 'DESC')

    return qb.getMany()
  }

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
