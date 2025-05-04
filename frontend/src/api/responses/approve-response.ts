import { createUseMutation } from '@/api/utils/create-use-mutation'
import { Axios } from '@/api/utils/axios'

interface Data {
  id: string
  message: string
}

export const useApproveResponse = createUseMutation(
  ({ id, ...data }: Data) => Axios.post(`/responses/${id}/approve`, data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['responses'] }],
    onSuccess: () => {
      alert('Отклик соискателя успешно принят')
    },
  },
)
