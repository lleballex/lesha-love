import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'

import { User } from '@/types/entities/user'

const formSchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  patronymic: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  bornAt: z.date(),
  city: z.string().nonempty(),
  phone: z.string().nonempty(),
  email: z.string().email(),
  skills: z.string().nonempty(),
  description: z.string().nonempty(),
  jobName: z.string().nonempty(),
  salaryFrom: z.coerce.number().int().min(0),
})

export const formResolver = zodResolver(formSchema)

export type FormData = z.infer<typeof formSchema>

export const getFormInitData = (user?: User): FormData =>
  user?.candidate
    ? {
        ...user.candidate,
        email: user.email,
        salaryFrom: user.candidate.salaryFrom ?? 0,
        bornAt: dayjs(user.candidate.bornAt).toDate(),
      }
    : {
        name: '',
        surname: '',
        patronymic: null,
        bornAt: new Date(2004, 0, 1),
        city: '',
        phone: '',
        email: user?.email ?? '',
        skills: '',
        description: '',
        jobName: '',
        salaryFrom: 0,
      }
