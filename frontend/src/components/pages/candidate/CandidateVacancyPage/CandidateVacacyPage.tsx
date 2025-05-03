import Vacancy from '@/components/base/vacancy/Vacancy'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function CandidateVacanciesPage() {
  return (
    <Page roles={[UserRole.Candidate]}>
      <Vacancy />
    </Page>
  )
}
