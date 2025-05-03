import { BaseEntity } from './base-entity'
import { Vacancy } from './vacancy'

export interface Scope extends BaseEntity {
  name: string
  vacancies?: Vacancy[]
}
