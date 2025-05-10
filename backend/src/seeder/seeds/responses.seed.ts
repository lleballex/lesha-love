import { Response, ResponseStatus } from '@/responses/entities/response.entity'
import { Candidate } from '@/users/entities/candidate.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'

interface ResponseSeed extends Omit<Response, 'vacancy' | 'candidate'> {
  vacancy: Pick<Vacancy, 'id'>
  candidate: Pick<Candidate, 'id'>
}

export const responsesSeed: ResponseSeed[] = [
  {
    id: '1a1a1a1a-0000-0000-0000-000000000001',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Pending,
    vacancy: {
      id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    message: null,
  },
  {
    id: '1a1a1a1a-0000-0000-0000-000000000002',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Approved,
    vacancy: {
      id: '30b1b9c3-874a-478e-9b91-2652f17a8f51',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    message:
      'Ваш отклик нас заинтересовал. Мы свяжемся с вами по указанному телефону в течение 2 рабочих дней для согласования даты технического интервью.',
  },
  {
    id: '1a1a1a1a-0000-0000-0000-000000000003',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Rejected,
    vacancy: {
      id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    },
    candidate: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    message:
      'Извините, мы приняли решение продолжить с другим кандидатом. Благодарим за интерес к нашей вакансии.',
  },
  {
    id: '2b2b2b2b-0000-0000-0000-000000000001',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Pending,
    vacancy: {
      id: 'a7032ef0-2b65-4124-9099-1ff1e49f21a2',
    },
    candidate: {
      id: 'f389e4da-9c5b-4877-a519-8d0cc179b909',
    },
    message: null,
  },
  {
    id: '2b2b2b2b-0000-0000-0000-000000000002',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Approved,
    vacancy: {
      id: 'f1aa9819-e96e-4c1a-9b19-04f7ee2934d7',
    },
    candidate: {
      id: 'f389e4da-9c5b-4877-a519-8d0cc179b909',
    },
    message:
      'Ваш профиль произвёл хорошее впечатление! Мы отправили письмо на вашу электронную почту с предложением времени для собеседования. Пожалуйста, подтвердите удобный слот.',
  },
  {
    id: '2b2b2b2b-0000-0000-0000-000000000003',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Rejected,
    vacancy: {
      id: 'd1c7a5aa-1c21-4ec2-bd2c-fecf245dce84',
    },
    candidate: {
      id: 'f389e4da-9c5b-4877-a519-8d0cc179b909',
    },
    message:
      'К сожалению, мы не можем предложить вам данную позицию. Удачи в дальнейшем поиске!',
  },
]
