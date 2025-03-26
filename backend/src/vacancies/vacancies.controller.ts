import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { VacanciesService } from './vacancies.service'

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  findAll() {
    return this.vacanciesService.findAll()
  }
}
