import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { BaseEntity } from '@/core/entities/base-entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'

import { User } from './user.entity'

@Entity()
export class Recruiter extends BaseEntity {
  @Column('varchar')
  name: string

  @Column('varchar')
  surname: string

  @Column('varchar', { nullable: true })
  patronymic: string | null

  @Column('varchar')
  companyName: string

  @Column('varchar')
  companyLogo: string

  @OneToOne(() => User, (user) => user.recruiter, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user?: User

  @OneToMany(() => Vacancy, (vacancy) => vacancy.recruiter)
  vacancies?: Vacancy[]
}
