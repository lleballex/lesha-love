import { Vacancy, VacancyStatus } from '@/types/entities/vacancy'
import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'
import { Paginated } from '@/types/paginated'

interface Params {
  query?: string
  scope?: string
  status?: VacancyStatus
  byCurRecruiter?: boolean
  page?: number
  take?: number
}

export const useVacancies = createUseQuery('vacancies', (params: Params) =>
  Axios.get<Paginated<Vacancy>>('/vacancies', { params }).then(
    (res) => res.data,
  ),
)
