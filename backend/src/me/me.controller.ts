import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { IsAuthedGuard } from '@/auth/guards/is-authed.guard'
import { UsersService } from '@/users/users.service'

import { MeService } from './me.service'

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
}
