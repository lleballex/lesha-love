import { Candidate } from '@/users/entities/candidate.entity'
import { User } from '@/users/entities/user.entity'

interface CandidateSeed extends Omit<Candidate, 'user'> {
  user: Pick<User, 'id'>
}

export const candidatesSeed: CandidateSeed[] = [
  {
    id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Candidate',
    surname: 'Candidate',
    patronymic: 'Candidate',
    jobName: 'Frontend-разработчик',
    city: 'г. Иваново',
    salaryFrom: 10000,
    phone: '8 888 888 88-88',
    description: 'Hello world!',
    skills: 'JavaScript, TypeScript, React, Next.js',
    bornAt: new Date(2004, 1, 1),
    user: {
      id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    },
  },
]
