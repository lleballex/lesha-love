import { Vacancy, VacancyStatus } from '@/vacancies/entities/vacancy.entity'

export const vacanciesSeed: Vacancy[] = [
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Software Engineer',
    description:
      'We are looking for a talented software engineer to join our team.',
    status: VacancyStatus.Active,
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad053',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Product Manager',
    description:
      'We are looking for a talented product manager to join our team.',
    status: VacancyStatus.Active,
  },
]
