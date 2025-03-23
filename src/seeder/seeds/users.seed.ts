import { User, UserRole } from '@/users/entities/user.entity'

export const usersSeed: User[] = [
  {
    id: '22ead1c4-c2ef-4771-9bc6-037d0260a14d',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'recruiter@example.com',
    name: 'recruiter',
    surname: 'recruiter',
    patronymic: 'recruiter',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Recruiter,
  },
  {
    id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'candidate@example.com',
    name: 'candidate',
    surname: 'candidate',
    patronymic: 'candidate',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Candidate,
  },
]
