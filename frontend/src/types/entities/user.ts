import { BaseEntity } from './base-entity'

export enum UserRole {
  Recruiter = 'recruiter',
  Candidate = 'candidate',
}

export interface User extends BaseEntity {
  name: string
  surname: string
  patronymic: string | null
  email: string
  role: UserRole
}
