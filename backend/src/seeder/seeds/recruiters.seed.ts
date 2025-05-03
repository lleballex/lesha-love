import { Recruiter } from '@/users/entities/recruiter.entity'
import { User } from '@/users/entities/user.entity'

interface RecruiterSeed extends Omit<Recruiter, 'user'> {
  user: Pick<User, 'id'>
}

export const recruitersSeed: RecruiterSeed[] = [
  {
    id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Recruiter',
    surname: 'Recruiter',
    patronymic: 'Recruiter',
    user: {
      id: '22ead1c4-c2ef-4771-9bc6-037d0260a14d',
    },
    companyName: 'Company Name',
    companyLogo:
      'https://play-lh.googleusercontent.com/s6JiMSUktkTX0ejwpJ-DgqVb03dE00O975GGOoMmrlVL1aI8A1yOy7xh3dOSaxpuFWJH',
  },
]
