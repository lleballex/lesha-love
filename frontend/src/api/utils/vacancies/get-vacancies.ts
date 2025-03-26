import { useEffect, useState } from 'react'

import { Vacancy } from '@/types/entities/vacancy'
import { RemoteData } from '@/types/remote-data'
import { Axios } from '@/api/utils/axios'

export const useVacancies = () => {
  const [data, setData] = useState<RemoteData<Vacancy[]>>({ status: 'pending' })

  useEffect(() => {
    Axios.get<Vacancy[]>('/vacancies')
      .then((res) => {
        setData({ status: 'success', value: res.data })
      })
      .catch((e) => {
        setData({ status: 'error', error: e })
      })
  }, [])

  return data
}
