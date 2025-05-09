import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UsersService } from '@/users/users.service'
import { Candidate } from '@/users/entities/candidate.entity'
import { User } from '@/users/entities/user.entity'

import { UpdateCandidateDto } from './dto/update-candidate.dto'
import { CreateCandidateDto } from './dto/create-candidate.dto'

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidatesRepo: Repository<Candidate>,

    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    private readonly usersService: UsersService,
  ) {}

  async createCandidate(dto: CreateCandidateDto, userId: string) {
    const user = await this.usersService.findOne(userId)

    if (user.candidate) {
      throw new ConflictException('User already has filled candidate profile')
    }

    const candidate = this.candidatesRepo.create({
      ...dto,
      user: { id: user.id },
    })

    await this.candidatesRepo.save(candidate)

    return this.usersService.findOne(userId)
  }

  async updateCandidate({ email, ...dto }: UpdateCandidateDto, userId: string) {
    const user = await this.usersService.findOne(userId)

    if (!user.candidate) {
      throw new ForbiddenException('User must have filled candidate profile')
    }

    if (email && email !== user.email) {
      if (await this.usersService.findOneForAuth(email)) {
        throw new ConflictException('User with this email already exists')
      }

      user.email = email
      await this.usersRepo.save(user)
    }

    await this.candidatesRepo.update({ id: user.candidate.id }, dto)

    return this.usersService.findOne(userId)
  }
}
