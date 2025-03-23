import { Column, Entity, ManyToOne } from 'typeorm'

import { User } from '@/users/entities/user.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { BaseEntity } from '@/core/entities/base-entity'

export enum ResponseStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class Response extends BaseEntity {
  @Column({ enum: ResponseStatus, default: ResponseStatus.Pending })
  status: ResponseStatus

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.responses)
  vacancy?: Vacancy

  @ManyToOne(() => User, (user) => user.responses)
  user?: User
}
