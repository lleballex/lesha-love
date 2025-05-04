import { Controller, Get, Query, Req } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { ResponsesService } from './responses.service'
import { FindAllResponsesDto } from './dto/find-all-responses.dto'

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all responses' })
  findAll(@Query() query: FindAllResponsesDto, @Req() req: Request) {
    return this.responsesService.findAll(query, req.user?.id)
  }
}
