import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private generateToken(user: User) {
    return this.jwtService.signAsync({
      userId: user.id,
      userRole: user.role,
    })
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findOneForAuth(dto.email)

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      return null
    }

    return {
      token: await this.generateToken(user),
    }
  }

  async register(dto: RegisterDto) {
    if (await this.usersService.findOneForAuth(dto.email)) {
      throw new ConflictException('User with email already exists')
    }

    const hashPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.usersService.create({
      ...dto,
      password: hashPassword,
    })

    return {
      token: await this.generateToken(user),
    }
  }
}
