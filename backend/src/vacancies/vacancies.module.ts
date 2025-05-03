import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ResponsesModule } from '@/responses/responses.module'
import { UsersModule } from '@/users/users.module'

import { Vacancy } from './entities/vacancy.entity'
import { VacanciesController } from './vacancies.controller'
import { VacanciesService } from './vacancies.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    ResponsesModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
