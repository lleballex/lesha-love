import { User, UserRole } from '@/users/entities/user.entity'

export const usersSeed: User[] = [
  {
    id: '22ead1c4-c2ef-4771-9bc6-037d0260a14d',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'recruiter1@example.com',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Recruiter,
  },
  {
    id: '2a3f9dc1-3ef4-49c6-bd64-bb62c9cbe2b1',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'recruiter2@example.com',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Recruiter,
  },
  {
    id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'candidate1@example.com',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Candidate,
  },
  {
    id: 'a1e6ff23-4357-421c-9439-94ff05e0625a',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'candidate2@example.com',
    password: '$2b$10$c5Gc9HXpglIVX.1WX9aBd.NtT/sKqnfSQG7Ib1PqA4t69BccbZgAK',
    role: UserRole.Candidate,
  },
]
