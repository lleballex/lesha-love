import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Vacancy,
  VacancyWorkExperience,
  VacancyWorkFormat,
  VacancyWorkSchedule,
} from '@/types/entities/vacancy'

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  responsibilities: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  conditions: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  requirements: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .nullable(),
  workExperience: z.nativeEnum(VacancyWorkExperience),
  workSchedule: z.nativeEnum(VacancyWorkSchedule),
  workFormat: z.nativeEnum(VacancyWorkFormat),
  salaryFrom: z
    .union([z.string(), z.number()])
    .nullable()
    .transform((val) => (val === '' || val === null ? null : +val))
    .pipe(z.number().int().min(0).nullable()),
  salaryTo: z
    .union([z.string(), z.number()])
    .nullable()
    .transform((val) => (val === '' || val === null ? null : +val))
    .pipe(z.number().int().min(0).nullable()),
  scope: z.string().nonempty(),
})

export const formResolver = zodResolver(formSchema)

export type FormData = z.infer<typeof formSchema>

export const getFormInitData = (vacancy?: Vacancy): FormData =>
  vacancy
    ? {
        ...vacancy,
        scope: vacancy.scope?.id ?? '',
      }
    : {
        title: '',
        description: '',
        responsibilities: null,
        conditions: null,
        requirements: null,
        workExperience: VacancyWorkExperience.NoExperience,
        workSchedule: VacancyWorkSchedule.NoSchedule,
        workFormat: VacancyWorkFormat.OnSite,
        salaryFrom: null,
        salaryTo: null,
        scope: '',
      }
