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
} from '@/vacancies/entities/vacancy.entity'

export class UpdateVacancyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  workExperience: VacancyWorkExperience

  @IsEnum(VacancyWorkSchedule)
  @IsOptional()
  workSchedule: VacancyWorkSchedule

  @IsEnum(VacancyWorkFormat)
  @IsOptional()
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
  @IsOptional()
  scope: string
}
