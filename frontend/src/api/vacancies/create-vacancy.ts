import { Axios } from '../utils/axios'
import { createUseMutation } from '../utils/create-use-mutation'

interface Data {
  title: string
  description: string
}

export const useCreateVacancy = createUseMutation(
  (data: Data) => Axios.post('/vacancies', data),
  {
    invalidateQueriesFn: () => [{ queryKey: ['vacancies'] }],
  },
)
