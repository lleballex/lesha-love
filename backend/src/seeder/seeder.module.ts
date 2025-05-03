import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@/users/entities/user.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { Response } from '@/responses/entities/response.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'
import { Candidate } from '@/users/entities/candidate.entity'
import { Scope } from '@/scopes/entities/scope.entity'

import { SeederService } from './seeder.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Recruiter,
      Candidate,
      Scope,
      Vacancy,
      Response,
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
