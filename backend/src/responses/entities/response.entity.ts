import { Column, Entity, ManyToOne } from 'typeorm'

import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { BaseEntity } from '@/core/entities/base-entity'
import { Candidate } from '@/users/entities/candidate.entity'

export enum ResponseStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class Response extends BaseEntity {
  @Column({ enum: ResponseStatus, default: ResponseStatus.Pending })
  status: ResponseStatus

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.responses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  vacancy?: Vacancy

  @ManyToOne(() => Candidate, (candidate) => candidate.responses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  candidate?: Candidate
}
