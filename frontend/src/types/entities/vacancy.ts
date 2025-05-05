import { BaseEntity } from './base-entity'
import { Recruiter } from './recruiter'
import { Response } from './response'
import { Scope } from './scope'

export enum VacancyStatus {
  Active = 'active',
  Closed = 'closed',
}

export const vacancyStatuses: Record<VacancyStatus, string> = {
  [VacancyStatus.Active]: 'Активна',
  [VacancyStatus.Closed]: 'В архиве',
}

export enum VacancyWorkExperience {
  NoExperience = 'no_experience',
  UpTo3 = 'up_to_3',
  UpTo6 = 'up_to_6',
  From6 = 'from_6',
}

export const vacancyWorkExperiences: Record<VacancyWorkExperience, string> = {
  [VacancyWorkExperience.NoExperience]: 'Без опыта',
  [VacancyWorkExperience.UpTo3]: 'До 3 лет',
  [VacancyWorkExperience.UpTo6]: 'От 1 до 3 лет',
  [VacancyWorkExperience.From6]: 'От 6 лет',
}

export enum VacancyWorkSchedule {
  NoSchedule = 'no_schedule',
  FiveToTwo = '5_2',
  TwoToTwo = '2_2',
  ThreeToThree = '3_3',
}

export const vacancyWorkSchedules: Record<VacancyWorkSchedule, string> = {
  [VacancyWorkSchedule.NoSchedule]: 'Свободный график',
  [VacancyWorkSchedule.FiveToTwo]: 'График 5/2',
  [VacancyWorkSchedule.TwoToTwo]: 'График 2/2',
  [VacancyWorkSchedule.ThreeToThree]: 'График 3/3',
}

export enum VacancyWorkFormat {
  OnSite = 'on_site',
  Remote = 'remote',
  Hybrid = 'hybrid',
}

export const vacancyWorkFormats: Record<VacancyWorkFormat, string> = {
  [VacancyWorkFormat.OnSite]: 'В офисе',
  [VacancyWorkFormat.Remote]: 'Удалено',
  [VacancyWorkFormat.Hybrid]: 'Гибрид',
}

export interface Vacancy extends BaseEntity {
  title: string
  description: string
  responsibilities: string | null
  conditions: string | null
  requirements: string | null
  status: VacancyStatus
  workExperience: VacancyWorkExperience
  workSchedule: VacancyWorkSchedule
  workFormat: VacancyWorkFormat
  salaryFrom: number | null
  salaryTo: number | null
  responsesCount: number
  scope?: Scope
  recruiter?: Recruiter
  responses?: Response[]
}
