import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@/core/entities/base-entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'

@Entity()
export class Scope extends BaseEntity {
  @Column('varchar')
  name: string

  @OneToMany(() => Vacancy, (vacancy) => vacancy.scope)
  vacancies?: Vacancy[]
}
