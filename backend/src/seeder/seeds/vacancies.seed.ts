import { Scope } from '@/scopes/entities/scope.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'
import {
  Vacancy,
  VacancyStatus,
  VacancyWorkExperience,
  VacancyWorkFormat,
  VacancyWorkSchedule,
} from '@/vacancies/entities/vacancy.entity'

interface VacancySeed extends Omit<Vacancy, 'scope' | 'recruiter'> {
  scope: Pick<Scope, 'id'>
  recruiter: Pick<Recruiter, 'id'>
}

export const vacanciesSeed: VacancySeed[] = [
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Software Engineer',
    description:
      'We are looking for a talented software engineer to join our team.',
    responsibilities: 'Responsibilites',
    conditions: 'conditions',
    requirements: 'requirements',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.From6,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 10000,
    salaryTo: 200000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e1',
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad053',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Software Programmer',
    description:
      'We are looking for a talented software programmer to join our team.',
    responsibilities: 'Responsibilites',
    conditions: 'conditions',
    requirements: 'requirements',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.NoExperience,
    workSchedule: VacancyWorkSchedule.NoSchedule,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: null,
    salaryTo: 200000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e3',
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
]
