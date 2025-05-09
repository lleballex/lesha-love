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
import { Recruiter } from '@/users/entities/recruiter.entity'

import { UpdateCandidateDto } from './dto/update-candidate.dto'
import { CreateCandidateDto } from './dto/create-candidate.dto'
import { CreateRecruiterDto } from './dto/create-recruiter.dto'
import { UpdateRecruiterDto } from './dto/update-recruiter.dto'

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidatesRepo: Repository<Candidate>,

    @InjectRepository(Recruiter)
    private readonly recruitersRepo: Repository<Recruiter>,

    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    private readonly usersService: UsersService,
  ) {}

  async createRecruiter(dto: CreateRecruiterDto, userId: string) {
    const user = await this.usersService.findOne(userId)

    if (user.recruiter) {
      throw new ConflictException('User already has filled recruiter profile')
    }

    const recruiter = this.recruitersRepo.create({
      ...dto,
      user: { id: user.id },
    })

    await this.recruitersRepo.save(recruiter)

    return this.usersService.findOne(user.id)
  }

  async updateRecruiter({ email, ...dto }: UpdateRecruiterDto, userId: string) {
    const user = await this.usersService.findOne(userId)

    if (!user.recruiter) {
      throw new ForbiddenException('User must have filled recruiter profile')
    }

    if (email && email !== user.email) {
      if (await this.usersService.findOneForAuth(email)) {
        throw new ConflictException('User with this email already exists')
      }

      user.email = email
      await this.usersRepo.save(user)
    }

    await this.recruitersRepo.update({ id: user.recruiter.id }, dto)

    return this.usersService.findOne(user.id)
  }

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

    return this.usersService.findOne(user.id)
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

    return this.usersService.findOne(user.id)
  }
}
