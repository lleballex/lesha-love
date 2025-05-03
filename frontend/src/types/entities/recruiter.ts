import { BaseEntity } from './base-entity'
import { User } from './user'
import { Vacancy } from './vacancy'

export interface Recruiter extends BaseEntity {
  name: string
  surname: string
  patronymic: string | null
  companyName: string
  companyLogo: string
  user?: User
  vacancies?: Vacancy[]
}
