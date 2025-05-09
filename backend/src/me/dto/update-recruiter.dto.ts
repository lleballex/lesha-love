import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateRecruiterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surname?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patronymic?: string | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  companyName?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  companyLogo?: string

  @IsEmail()
  @IsOptional()
  email?: string
}
