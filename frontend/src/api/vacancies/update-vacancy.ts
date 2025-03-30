import { Axios } from '@/api/utils/axios'
import { createUseMutation } from '@/api/utils/create-use-mutation'

interface Data {
  id: string
  title?: string
  description?: string
}

export const useUpdateVacancy = createUseMutation(
  ({ id, ...data }: Data) => Axios.patch(`/vacancies/${id}`, data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['vacancies'] }],
  },
)
