import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Entity } from 'typeorm'
import { BaseEntity } from '@/core/entities/base-entity'

@Entity()
export class User extends BaseEntity {
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
}
