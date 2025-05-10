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
    name: 'Игорь',
    surname: 'Смирнов',
    patronymic: 'Валерьевич',
    jobName: 'Frontend-разработчик',
    city: 'г. Москва',
    salaryFrom: 120000,
    phone: '8 915 123 45-67',
    description:
      'Frontend-разработчик с двухлетним опытом коммерческой разработки. Специализируюсь на создании интерфейсов с использованием React и Next.js. Имею опыт работы в стартапах и крупных проектах, в том числе с SSR, SPA и REST API.',
    skills:
      'JavaScript, TypeScript, React, Next.js, Redux, HTML, CSS, Tailwind, Git',
    bornAt: new Date(2001, 4, 15), // 15 мая 2001
    user: {
      id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d', // candidate1@example.com
    },
  },
  {
    id: 'f389e4da-9c5b-4877-a519-8d0cc179b909',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Екатерина',
    surname: 'Лебедева',
    patronymic: 'Андреевна',
    jobName: 'Аналитик данных',
    city: 'г. Санкт-Петербург',
    salaryFrom: 140000,
    phone: '8 926 654 32-10',
    description:
      'Data-аналитик с опытом работы более 3 лет. Умею работать с большими объемами данных, визуализировать информацию и формулировать инсайты для бизнеса. Имею опыт в e-commerce и банковском секторе.',
    skills:
      'SQL, Python, Pandas, Tableau, Power BI, Excel, A/B тестирование, статистика',
    bornAt: new Date(1998, 10, 23), // 23 ноября 1998
    user: {
      id: 'a1e6ff23-4357-421c-9439-94ff05e0625a', // candidate2@example.com
    },
  },
]
