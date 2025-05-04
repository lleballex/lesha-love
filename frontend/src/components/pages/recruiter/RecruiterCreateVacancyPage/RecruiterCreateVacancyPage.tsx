import VacancyForm from '@/components/base/vacancy/VacancyForm'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function RecruiterCreateVacancyPage() {
  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <VacancyForm />
    </Page>
  )
}
