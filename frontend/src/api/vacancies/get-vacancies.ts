import { Vacancy } from '@/types/entities/vacancy'
import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'

export const useVacancies = createUseQuery('vacancies', () =>
  Axios.get<Vacancy[]>('/vacancies').then((res) => res.data),
)
