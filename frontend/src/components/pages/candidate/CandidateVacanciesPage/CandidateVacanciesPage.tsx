import Vacancies from '@/components/base/vacancy/Vacancies'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function CandidateVacanciesPage() {
  return (
    <Page roles={[UserRole.Candidate]}>
      <Vacancies role={UserRole.Candidate} />
    </Page>
  )
}
