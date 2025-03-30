import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateVacancyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string
}
