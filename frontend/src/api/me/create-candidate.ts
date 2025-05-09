import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  name: string
  surname: string
  patronymic?: string | null
  jobName: string
  city: string
  salaryFrom?: number | null
  phone: string
  description: string
  skills: string
  bornAt: Date
}

export const useCreateCandidate = createUseMutation(
  (data: Data) => Axios.post('/me/candidate', data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
    onSuccess: () => {
      alert('Данные успешно сохранены')
    },
  },
)
