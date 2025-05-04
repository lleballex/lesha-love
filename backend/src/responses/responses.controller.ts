import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { IsRecruiterGuard } from '@/auth/guards/is-recruiter.guard'

import { ResponsesService } from './responses.service'
import { FindAllResponsesDto } from './dto/find-all-responses.dto'
import { ResponseStatus } from './entities/response.entity'
import { ChangeResponseStatusDto } from './dto/change-response-status.dto'

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all responses' })
  findAll(@Query() query: FindAllResponsesDto, @Req() req: Request) {
    return this.responsesService.findAll(query, req.user?.id)
  }

  @Post(':id/approve')
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({
    summary: 'Approve pending response by id. Only available for recruiters',
  })
  approve(
    @Param('id') id: string,
    @Body() body: ChangeResponseStatusDto,
    @Req() req: Request,
  ) {
    return this.responsesService.changeStatus(
      id,
      req.user!.id,
      ResponseStatus.Approved,
      body,
    )
  }

  @Post(':id/reject')
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({
    summary: 'Reject pending response by id. Only available for recruiters',
  })
  reject(
    @Param('id') id: string,
    @Body() body: ChangeResponseStatusDto,
    @Req() req: Request,
  ) {
    return this.responsesService.changeStatus(
      id,
      req.user!.id,
      ResponseStatus.Rejected,
      body,
    )
  }
}
