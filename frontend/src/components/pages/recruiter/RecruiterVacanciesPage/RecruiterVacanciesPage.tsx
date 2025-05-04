import Vacancies from '@/components/base/vacancy/Vacancies'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function RecruiterVacanciesPage() {
  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <Vacancies role={UserRole.Recruiter} />
    </Page>
  )
}
