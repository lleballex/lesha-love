import { createUseMutation } from '@/api/utils/create-use-mutation'
import { Axios } from '@/api/utils/axios'

interface Data {
  id: string
  message: string
}

export const useRejectResponse = createUseMutation(
  ({ id, ...data }: Data) => Axios.post(`/responses/${id}/reject`, data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['responses'] }],
    onSuccess: () => {
      alert('Отклик соискателя успешно отклонен')
    },
  },
)
