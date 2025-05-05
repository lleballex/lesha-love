import { createUseMutation } from '@/api/utils/create-use-mutation'
import { Axios } from '@/api/utils/axios'

interface Data {
  id: string
}

export const useDeleteVacancy = createUseMutation(
  ({ id }: Data) => Axios.delete(`/vacancies/${id}`),
  {
    invalidateQueriesFn: () => [{ queryKey: ['vacancies'] }],
    onSuccess: () => {
      alert('Вакансия успешно удалена')
    },
  },
)
