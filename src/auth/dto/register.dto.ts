import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { UserRole } from '@/users/entities/user.entity'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patronymic?: string | null

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(UserRole)
  role: UserRole
}
