import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string
}
