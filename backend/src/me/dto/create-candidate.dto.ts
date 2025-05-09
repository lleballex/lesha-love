import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateCandidateDto {
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
  jobName: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsInt()
  @Min(0)
  @IsOptional()
  salaryFrom?: number | null

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  skills: string

  @IsDateString()
  bornAt: Date
}
