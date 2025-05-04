import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from '@/users/users.module'
import { VacanciesModule } from '@/vacancies/vacancies.module'

import { Response } from './entities/response.entity'
import { ResponsesService } from './responses.service'
import { ResponsesController } from './responses.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    forwardRef(() => VacanciesModule),
    UsersModule,
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
