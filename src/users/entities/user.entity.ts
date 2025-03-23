import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '@/core/entities/base-entity'
import { Response } from '@/responses/entities/response.entity'

export enum UserRole {
  Recruiter = 'recruiter',
  Candidate = 'candidate',
}

@Entity()
export class User extends BaseEntity {
  @Column('varchar')
  name: string

  @Column('varchar')
  surname: string

  @Column('varchar', { nullable: true })
  patronymic: string | null

  @Column('varchar', { unique: true })
  email: string

  @Column('varchar', { select: false })
  password: string

  @Column({ enum: UserRole })
  role: UserRole

  @OneToMany(() => Response, (response) => response.user)
  responses?: Response
}
