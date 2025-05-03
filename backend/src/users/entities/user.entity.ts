import { Column, Entity, OneToOne } from 'typeorm'

import { BaseEntity } from '@/core/entities/base-entity'

import { Recruiter } from './recruiter.entity'
import { Candidate } from './candidate.entity'

export enum UserRole {
  Recruiter = 'recruiter',
  Candidate = 'candidate',
}

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { unique: true })
  email: string

  @Column('varchar', { select: false })
  password: string

  @Column({ enum: UserRole })
  role: UserRole

  @OneToOne(() => Recruiter, (recruiter) => recruiter.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  recruiter?: Recruiter

  @OneToOne(() => Candidate, (candidate) => candidate.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  candidate?: Candidate
}
