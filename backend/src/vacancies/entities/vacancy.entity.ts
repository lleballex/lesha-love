import { Column, Entity, OneToMany } from 'typeorm'

import { Response } from '@/responses/entities/response.entity'
import { BaseEntity } from '@/core/entities/base-entity'

export enum VacancyStatus {
  Active = 'active',
  Closed = 'closed',
}

@Entity()
export class Vacancy extends BaseEntity {
  @Column('varchar')
  title: string

  @Column('text')
  description: string

  @Column({ enum: VacancyStatus, default: VacancyStatus.Active })
  status: VacancyStatus

  @OneToMany(() => Response, (response) => response.vacancy)
  responses?: Response[]
}
