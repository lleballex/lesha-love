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

  @OneToOne(() => User, (user) => user.candidate, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user?: User

  @OneToMany(() => Response, (response) => response.candidate)
  responses?: Response
}
