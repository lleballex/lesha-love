import {
  // Body,
  Controller,
  // Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  // Patch,
  // Post,
  Query,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { VacanciesService } from './vacancies.service'
// import { CreateVacancyDto } from './dto/create-vacancy.dto'
// import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { FindAllVacanciesDto } from './dto/find-all-vacancies.dto'

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  findAll(@Query() query: FindAllVacanciesDto) {
    return this.vacanciesService.findAll(query)
  }

  // @Post()
  // @ApiOperation({ summary: 'Create vacancy' })
  // create(@Body() body: CreateVacancyDto) {
  //   return this.vacanciesService.create(body)
  // }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vacancy by id',
  })
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(id)
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Update user by id',
  // })
  // update(@Param('id') id: string, @Body() body: UpdateVacancyDto) {
  //   return this.vacanciesService.update(id, body)
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({
  //   summary: 'Delete vacancy by id',
  // })
  // async delete(@Param('id') id: string) {
  //   await this.vacanciesService.delete(id)
  // }
}
