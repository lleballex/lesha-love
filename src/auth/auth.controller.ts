import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
