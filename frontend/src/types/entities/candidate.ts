import { BaseEntity } from './base-entity'
import { Response } from './response'
import { User } from './user'

export interface Candidate extends BaseEntity {
  name: string
  surname: string
  patronymic: string | null
  jobName: string
  city: string
  salaryFrom: number | null
  phone: string
  description: string
  skills: string
  bornAt: string
  user?: User
  responses?: Response[]
}
