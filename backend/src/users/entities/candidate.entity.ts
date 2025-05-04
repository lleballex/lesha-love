import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { BaseEntity } from '@/core/entities/base-entity'
import { Response } from '@/responses/entities/response.entity'

import { User } from './user.entity'

@Entity()
export class Candidate extends BaseEntity {
  @Column('varchar')
  name: string

  @Column('varchar')
  surname: string

  @Column('varchar', { nullable: true })
  patronymic: string | null

  @Column('varchar')
  jobName: string

  @Column('varchar')
  city: string

  @Column('int', { nullable: true })
  salaryFrom: number | null

  @Column('varchar')
  phone: string

  @Column('text')
  description: string

  @Column('text')
  skills: string

  @Column('timestamptz')
  bornAt: Date

  @OneToOne(() => User, (user) => user.candidate, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user?: User

  @OneToMany(() => Response, (response) => response.candidate)
  responses?: Response
}
