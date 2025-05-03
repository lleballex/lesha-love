import { Response } from '@/types/entities/response'
import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'

interface Params {
  vacancyId: string
}

export const useMyResponse = createUseQuery(
  'responses',
  ({ vacancyId }: Params) =>
    Axios.get<Response>(`/vacancies/${vacancyId}/my-response`).then(
      (res) => res.data,
    ),
  {
    retry: false,
  },
)
