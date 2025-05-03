import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator'
import { VacancyStatus } from '../entities/vacancy.entity'
import { ApiProperty } from '@nestjs/swagger'

export class FindAllVacanciesDto {
  @IsString()
  @IsOptional()
  query?: string

  @IsUUID(4)
  @IsOptional()
  scope?: string

  @IsEnum(VacancyStatus)
  @IsOptional()
  status?: VacancyStatus

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ required: false })
  page: number = 1

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  take: number = 10
}
