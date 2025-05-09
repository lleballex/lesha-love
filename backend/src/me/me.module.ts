import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from '@/users/users.module'
import { Candidate } from '@/users/entities/candidate.entity'
import { User } from '@/users/entities/user.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'

import { MeController } from './me.controller'
import { MeService } from './me.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Recruiter, User]),
    UsersModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
