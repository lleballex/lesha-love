import { useParams } from 'react-router'

import Vacancy from '@/components/base/vacancy/Vacancy'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function RecruiterVacancyPage() {
  const { id: vacancyId } = useParams()

  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <Vacancy id={vacancyId!} role={UserRole.Recruiter} />
    </Page>
  )
}
