import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { IsAuthedGuard } from '@/auth/guards/is-authed.guard'
import { UsersService } from '@/users/users.service'
import { IsCandidateGuard } from '@/auth/guards/is-candidate.guard'
import { IsRecruiterGuard } from '@/auth/guards/is-recruiter.guard'

import { MeService } from './me.service'
import { UpdateCandidateDto } from './dto/update-candidate.dto'
import { CreateCandidateDto } from './dto/create-candidate.dto'
import { CreateRecruiterDto } from './dto/create-recruiter.dto'
import { UpdateRecruiterDto } from './dto/update-recruiter.dto'

@Controller('me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(IsAuthedGuard)
  @ApiOperation({ summary: 'Get authenticated user' })
  me(@Req() req: Request) {
    return this.usersService.findOne(req.user!.id)
  }

  @Post('recruiter')
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({ summary: 'Create recruiter profile of authenticated user' })
  createRecruiter(@Body() body: CreateRecruiterDto, @Req() req: Request) {
    return this.meService.createRecruiter(body, req.user!.id)
  }

  @Patch('recruiter')
  @UseGuards(IsRecruiterGuard)
  @ApiOperation({ summary: 'Update recruiter profile of authenticated user' })
  updateRecruiter(@Body() body: UpdateRecruiterDto, @Req() req: Request) {
    return this.meService.updateRecruiter(body, req.user!.id)
  }

  @Post('candidate')
  @UseGuards(IsCandidateGuard)
  @ApiOperation({ summary: 'Create candidate profile of authenticated user' })
  createCandidate(@Body() body: CreateCandidateDto, @Req() req: Request) {
    return this.meService.createCandidate(body, req.user!.id)
  }

  @Patch('candidate')
  @UseGuards(IsCandidateGuard)
  @ApiOperation({ summary: 'Update candidate profile of authenticated user' })
  updateCandidate(@Body() body: UpdateCandidateDto, @Req() req: Request) {
    return this.meService.updateCandidate(body, req.user!.id)
  }
}
