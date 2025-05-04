import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator'
import {
  VacancyWorkExperience,
  VacancyWorkFormat,
  VacancyWorkSchedule,
} from '../entities/vacancy.entity'

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  responsibilities?: string | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  conditions?: string | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  requirements?: string | null

  @IsEnum(VacancyWorkExperience)
  workExperience: VacancyWorkExperience

  @IsEnum(VacancyWorkSchedule)
  workSchedule: VacancyWorkSchedule

  @IsEnum(VacancyWorkFormat)
  workFormat: VacancyWorkFormat

  @IsInt()
  @Min(0)
  @IsOptional()
  salaryFrom?: number | null

  @IsInt()
  @Min(0)
  @IsOptional()
  salaryTo?: number | null

  @IsUUID()
  scope: string
}
