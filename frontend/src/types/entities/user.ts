import { BaseEntity } from './base-entity'
import { Candidate } from './candidate'
import { Recruiter } from './recruiter'

export enum UserRole {
  Recruiter = 'recruiter',
  Candidate = 'candidate',
}

export const userRoles: Record<UserRole, string> = {
  [UserRole.Recruiter]: 'Рекрутер',
  [UserRole.Candidate]: 'Соискатель',
}

export interface User extends BaseEntity {
  email: string
  role: UserRole
  recruiter?: Recruiter
  candidate?: Candidate
}
