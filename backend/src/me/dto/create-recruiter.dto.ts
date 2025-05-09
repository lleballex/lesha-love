import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRecruiterDto {
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

  @IsString()
  @IsNotEmpty()
  companyName: string

  @IsString()
  @IsNotEmpty()
  companyLogo: string
}
