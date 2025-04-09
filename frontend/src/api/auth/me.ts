import { createUseQuery } from '@/api/utils/create-use-query'
import { Axios } from '@/api/utils/axios'
import { User } from '@/types/entities/user'

export const useMe = createUseQuery(
  'me',
  () => Axios.get<User>('/auth/me').then((res) => res.data),
  {
    retry: false,
  },
)
