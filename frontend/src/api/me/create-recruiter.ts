import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  name: string
  surname: string
  patronymic?: string | null
  companyName: string
  companyLogo: string
}

export const useCreateRecruiter = createUseMutation(
  (data: Data) => Axios.post('/me/recruiter', data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
    onSuccess: () => {
      alert('Данные успешно сохранены')
    },
  },
)
