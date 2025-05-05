import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'
import {
  VacancyStatus,
  VacancyWorkExperience,
  VacancyWorkFormat,
  VacancyWorkSchedule,
} from '@/types/entities/vacancy'

interface Data {
  id: string
  title?: string
  description?: string
  responsibilities?: string | null
  conditions?: string | null
  requirements?: string | null
  workExperience?: VacancyWorkExperience
  workSchedule?: VacancyWorkSchedule
  workFormat?: VacancyWorkFormat
  salaryFrom?: number | null
  salaryTo?: number | null
  scope?: string
  status?: VacancyStatus
}

export const useUpdateVacancy = createUseMutation(
  ({ id, ...data }: Data) => Axios.patch(`/vacancies/${id}`, data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['vacancies'] }],
  },
)
