import { useParams } from 'react-router'

import Vacancy from '@/components/base/vacancy/Vacancy'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function CandidateVacanciesPage() {
  const { id: vacancyId } = useParams()

  return (
    <Page roles={[UserRole.Candidate]} protected>
      <Vacancy id={vacancyId!} role={UserRole.Candidate} />
    </Page>
  )
}
