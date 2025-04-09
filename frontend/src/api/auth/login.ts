import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  email: string
  password: string
}

interface Res {
  token: string
}

export const useLogin = createUseMutation(
  (data: Data) =>
    Axios.post<Res>('/auth/login', data).then((res) => {
      localStorage.setItem('authToken', res.data.token)
    }),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
  },
)
