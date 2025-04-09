import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { UsersService } from '@/users/users.service'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'
import { IsAuthedGuard } from './guards/is-authed.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  @UseGuards(IsAuthedGuard)
  @ApiOperation({ summary: 'Get authenticated user' })
  me(@Req() req: Request) {
    return this.usersService.findOne(req.user!.id)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and generate access token' })
  async login(@Body() body: LoginDto) {
    const res = await this.authService.login(body)

    if (!res) {
      throw new UnauthorizedException()
    }

    return res
  }

  @Post('register')
  @ApiOperation({ summary: 'Register and generate access token' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }
}
