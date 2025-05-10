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
    name: 'Анна',
    surname: 'Иванова',
    patronymic: 'Сергеевна',
    user: {
      id: '22ead1c4-c2ef-4771-9bc6-037d0260a14d', // recruiter1@example.com
    },
    companyName: 'Яндекс',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Yandex_logo_2021.svg/320px-Yandex_logo_2021.svg.png',
  },
  {
    id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Дмитрий',
    surname: 'Кузнецов',
    patronymic: 'Алексеевич',
    user: {
      id: '2a3f9dc1-3ef4-49c6-bd64-bb62c9cbe2b1', // recruiter2@example.com
    },
    companyName: 'Сбер',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sberbank_Logotype_2020.svg/320px-Sberbank_Logotype_2020.svg.png',
  },
]
