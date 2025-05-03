import { BaseEntity } from './base-entity'
import { Candidate } from './candidate'
import { Recruiter } from './recruiter'

export enum UserRole {
  Recruiter = 'recruiter',
  Candidate = 'candidate',
}

export interface User extends BaseEntity {
  email: string
  role: UserRole
  recruiter?: Recruiter
  candidate?: Candidate
}
