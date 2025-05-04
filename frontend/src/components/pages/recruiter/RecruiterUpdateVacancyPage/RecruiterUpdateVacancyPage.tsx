import { useParams } from 'react-router'

import VacancyForm from '@/components/base/vacancy/VacancyForm'
import Page from '@/components/special/Page'
import RemoteData from '@/components/special/RemoteData'
import { UserRole } from '@/types/entities/user'
import { useVacancy } from '@/api/vacancies/get-vacancy'

export default function RecruiterUpdateVacancyPage() {
  const { id: vacancyId } = useParams()

  const vacancy = useVacancy({ id: vacancyId! })

  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <RemoteData
        data={vacancy}
        onSuccess={(vacancy) => <VacancyForm vacancy={vacancy} />}
      />
    </Page>
  )
}
