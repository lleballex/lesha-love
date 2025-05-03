import { createUseQuery } from '@/api/utils/create-use-query'
import { Axios } from '@/api/utils/axios'
import { Scope } from '@/types/entities/scope'

export const useScopes = createUseQuery('scopes', () =>
  Axios.get<Scope[]>('/scopes').then((res) => res.data),
)
