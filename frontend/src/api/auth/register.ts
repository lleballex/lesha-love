import { UserRole } from '@/types/entities/user'
import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  role: UserRole
  email: string
  password: string
}

interface Res {
  token: string
}

export const useRegister = createUseMutation(
  (data: Data) =>
    Axios.post<Res>('/auth/register', data).then((res) => {
      localStorage.setItem('authToken', res.data.token)
    }),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
  },
)
