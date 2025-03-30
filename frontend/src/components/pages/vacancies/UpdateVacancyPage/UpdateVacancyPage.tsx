import { useParams } from 'react-router'

import VacancyForm from '@/components/base/vacancy/VacancyForm'
import RemoteData from '@/components/special/RemoteData'
import { useVacancy } from '@/api/vacancies/get-vacancy'

export default function UpdateVacancyPage() {
  const { id: vacancyId } = useParams()

  const vacancy = useVacancy({ id: vacancyId! })

  return (
    <RemoteData
      data={vacancy}
      onSuccess={(vacancy) => <VacancyForm vacancy={vacancy} />}
    />
  )
}
