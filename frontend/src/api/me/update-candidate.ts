import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  email?: string
  name?: string
  surname?: string
  patronymic?: string | null
  jobName?: string
  city?: string
  salaryFrom?: number | null
  phone?: string
  description?: string
  skills?: string
  bornAt?: Date
}

export const useUpdateCandidate = createUseMutation(
  (data: Data) => Axios.patch('/me/candidate', data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
    onSuccess: () => {
      alert('Данные успешно сохранены')
    },
  },
)
