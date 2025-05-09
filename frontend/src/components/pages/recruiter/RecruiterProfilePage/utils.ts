import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { User } from '@/types/entities/user'

const formSchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  patronymic: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  companyName: z.string().nonempty(),
  companyLogo: z.string().nonempty(),
  email: z.string().email(),
})

export const formResolver = zodResolver(formSchema)

export type FormData = z.infer<typeof formSchema>

export const getFormInitData = (user?: User): FormData =>
  user?.recruiter
    ? {
        ...user.recruiter,
        email: user.email,
      }
    : {
        name: '',
        surname: '',
        patronymic: null,
        companyName: '',
        companyLogo: '',
        email: user?.email ?? '',
      }
