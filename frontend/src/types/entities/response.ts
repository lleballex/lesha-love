import { BaseEntity } from './base-entity'
import { Candidate } from './candidate'
import { Vacancy } from './vacancy'

export enum ResponseStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export const responseStatuses: Record<ResponseStatus, string> = {
  [ResponseStatus.Pending]: 'На рассмотрении',
  [ResponseStatus.Approved]: 'Принят',
  [ResponseStatus.Rejected]: 'Отклонен',
}

export interface Response extends BaseEntity {
  status: ResponseStatus
  message: string | null
  vacancy?: Vacancy
  candidate?: Candidate
}
