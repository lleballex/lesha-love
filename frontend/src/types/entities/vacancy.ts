import { BaseEntity } from '@/types/entities/base-entity'

export enum VacancyStatus {
  Active = 'active',
  Closed = 'closed',
}

export const vacancyStatuses = {
  [VacancyStatus.Active]: 'Active',
  [VacancyStatus.Closed]: 'Closed',
}

export interface Vacancy extends BaseEntity {
  title: string
  description: string
  status: VacancyStatus
  // responses?: Responses // TODO: implement
}
