import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { IsAuthedGuard } from '@/auth/guards/is-authed.guard'
import { UsersService } from '@/users/users.service'

@Controller('me')
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(IsAuthedGuard)
  @ApiOperation({ summary: 'Get authenticated user' })
  me(@Req() req: Request) {
    return this.usersService.findOne(req.user!.id)
  }
}
