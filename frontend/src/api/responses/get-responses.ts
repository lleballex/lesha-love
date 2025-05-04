import { Response } from '@/types/entities/response'
import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'

interface Params {
  byCurRecruiter?: boolean
  byCurCandidate?: boolean
}

export const useResponses = createUseQuery('responses', (params: Params) =>
  Axios.get<Response[]>('/responses', { params }).then((res) => res.data),
)
