import { createUseMutation } from '@/api/utils/create-use-mutation'
import { Axios } from '@/api/utils/axios'

interface Data {
  vacancyId: string
}

export const useCreateMyResponse = createUseMutation(
  ({ vacancyId }: Data) => Axios.post(`/vacancies/${vacancyId}/my-response`),
  {
    invalidateQueriesFn: () => [
      { queryKey: ['responses'] },
      { queryKey: ['myResponses'] },
    ],
    onSuccess: () => {
      alert('Отклик на вакансию успешно сохранен')
    },
  },
)
