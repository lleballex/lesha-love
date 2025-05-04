import {
  Body,
  Controller,
  // Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { ResponsesService } from '@/responses/responses.service'
import { IsCandidateGuard } from '@/auth/guards/is-candidate.guard'
import { IsRecruiterGuard } from '@/auth/guards/is-recruiter.guard'

import { VacanciesService } from './vacancies.service'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { FindAllVacanciesDto } from './dto/find-all-vacancies.dto'

@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly responsesService: ResponsesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  findAll(@Query() query: FindAllVacanciesDto, @Req() req: Request) {
    return this.vacanciesService.findAll(query, req.user?.id)
  }

  @Post()
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({ summary: 'Create vacancy. Only available for recruiters' })
  create(@Body() body: CreateVacancyDto, @Req() req: Request) {
    return this.vacanciesService.create(body, req.user!.id)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vacancy by id',
  })
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({
    summary: 'Update vacancy by id. Only available for recruiters',
  })
  update(
    @Param('id') id: string,
    @Body() body: UpdateVacancyDto,
    @Req() req: Request,
  ) {
    return this.vacanciesService.update(id, body, req.user!.id)
  }

  @Get(':id/my-response')
  @UseGuards(IsCandidateGuard)
  @ApiOperation({
    summary: 'Get a response to the vacancy by id for the current candidate',
  })
  async findMyResponse(@Param('id') id: string, @Req() req: Request) {
    return this.responsesService.findMy({
      userId: req.user!.id,
      vacancyId: id,
    })
  }

  @Post(':id/my-response')
  @UseGuards(IsCandidateGuard)
  @ApiOperation({
    summary: 'Create a response to the vacancy by id for the current candidate',
  })
  async createMyResponse(@Param('id') id: string, @Req() req: Request) {
    return this.responsesService.createMy({
      userId: req.user!.id,
      vacancyId: id,
    })
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({
  //   summary: 'Delete vacancy by id',
  // })
  // async delete(@Param('id') id: string) {
  //   await this.vacanciesService.delete(id)
  // }
}
