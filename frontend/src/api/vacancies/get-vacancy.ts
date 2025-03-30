import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'
import { Vacancy } from '@/types/entities/vacancy'

interface Params {
  id: string
}

export const useVacancy = createUseQuery('vacancies', ({ id }: Params) =>
  Axios.get<Vacancy>(`/vacancies/${id}`).then((res) => res.data),
)
