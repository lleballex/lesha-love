import { BaseEntity } from './base-entity'
import { Response } from './response'
import { User } from './user'

export interface Candidate extends BaseEntity {
  name: string
  surname: string
  patronymic: string | null
  user?: User
  responses?: Response[]
}
