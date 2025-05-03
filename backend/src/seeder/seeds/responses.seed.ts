import { Response, ResponseStatus } from '@/responses/entities/response.entity'
import { Candidate } from '@/users/entities/candidate.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'

interface ResponseSeed extends Omit<Response, 'vacancy' | 'candidate'> {
  vacancy: Pick<Vacancy, 'id'>
  candidate: Pick<Candidate, 'id'>
}

export const responsesSeed: ResponseSeed[] = [
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Pending,
    vacancy: {
      id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad053',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Approved,
    vacancy: {
      id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad054',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Rejected,
    vacancy: {
      id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
  },
]
