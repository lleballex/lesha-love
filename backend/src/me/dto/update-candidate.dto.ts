import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class UpdateCandidateDto {
  @IsEmail()
  @IsOptional()
  email?: string

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
  jobName?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string

  @IsInt()
  @Min(0)
  @IsOptional()
  salaryFrom?: number | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  skills?: string

  @IsDateString()
  @IsOptional()
  bornAt?: Date
}
