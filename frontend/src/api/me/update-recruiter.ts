import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  name?: string
  surname?: string
  patronymic?: string | null
  companyName?: string
  companyLogo?: string
  email?: string
}

export const useUpdateRecruiter = createUseMutation(
  (data: Data) => Axios.patch('/me/recruiter', data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['me'] }],
    onSuccess: () => {
      alert('Данные успешно сохранены')
    },
  },
)
