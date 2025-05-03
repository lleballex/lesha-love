import { useParams } from 'react-router'

import VacancyForm from '@/components/base/vacancy/VacancyForm'
import RemoteData from '@/components/special/RemoteData'
import { useVacancy } from '@/api/vacancies/get-vacancy'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

const UpdateVacancyPageContent = () => {
  const { id: vacancyId } = useParams()

  const vacancy = useVacancy({ id: vacancyId! })

  return (
    <RemoteData
      data={vacancy}
      onSuccess={(vacancy) => <VacancyForm vacancy={vacancy} />}
    />
  )
}

export default function UpdateVacancyPage() {
  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <UpdateVacancyPageContent />
    </Page>
  )
}
