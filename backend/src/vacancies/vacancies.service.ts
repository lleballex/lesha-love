import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  //  EntityNotFoundError,
  Repository,
} from 'typeorm'

import { UsersService } from '@/users/users.service'

import { Vacancy } from './entities/vacancy.entity'
// import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { FindAllVacanciesDto } from './dto/find-all-vacancies.dto'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacanciesRepo: Repository<Vacancy>,

    private readonly usersService: UsersService,
  ) {}

  async findAll(dto: FindAllVacanciesDto, userId?: string) {
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

    if (dto.byCurRecruiter) {
      if (!userId) {
        throw new ForbiddenException('You must be authorizated')
      }

      const user = await this.usersService.findOne(userId)

      if (!user.recruiter) {
        throw new ForbiddenException('User must have filled recruiter profile')
      }

      qb.andWhere('recruiter.id = :recruiterId', {
        recruiterId: user.recruiter.id,
      })
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

  async create(dto: CreateVacancyDto, userId: string) {
    const user = await this.usersService.findOne(userId)

    if (!user.recruiter) {
      throw new ForbiddenException('User must have filled recruiter profile')
    }

    const vacancy = this.vacanciesRepo.create({
      ...dto,
      scope: {
        id: dto.scope,
      },
      recruiter: {
        id: user.recruiter.id,
      },
    })

    return this.vacanciesRepo.save(vacancy)
  }

  async update(id: string, dto: UpdateVacancyDto, userId: string) {
    const user = await this.usersService.findOne(userId)
    const vacancy = await this.findOne(id)

    if (!user.recruiter) {
      throw new ForbiddenException('User must have filled recruiter profile')
    }

    if (vacancy.recruiter?.id !== user.recruiter.id) {
      throw new ForbiddenException(
        'You have no access to act with this vacancy',
      )
    }

    await this.vacanciesRepo.update(
      { id },
      {
        ...dto,
        scope: dto.scope
          ? {
              id: dto.scope,
            }
          : undefined,
      },
    )

    return this.findOne(id)
  }

  // async update(id: string, dto: UpdateVacancyDto) {
  //   const vacancy = await this.vacanciesRepo.preload({ id, ...dto })

  //   if (!vacancy) {
  //     throw new EntityNotFoundError(Vacancy, id)
  //   }

  //   return this.vacanciesRepo.save(vacancy)
  // }

  // async delete(id: string) {
  //   const vacancy = await this.findOne(id)
  //   await this.vacanciesRepo.remove(vacancy)
  //   return vacancy
  // }
}
