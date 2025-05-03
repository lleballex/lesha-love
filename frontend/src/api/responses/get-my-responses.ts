import { Response } from '@/types/entities/response'
import { Axios } from '@/api/utils/axios'
import { createUseQuery } from '@/api/utils/create-use-query'

export const useMyResponses = createUseQuery('myResponses', () =>
  Axios.get<Response[]>('/me/responses').then((res) => res.data),
)
