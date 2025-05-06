import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { UserRole } from '@/users/entities/user.entity'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(UserRole)
  role: UserRole
}
