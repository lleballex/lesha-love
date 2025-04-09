import VacancyForm from '@/components/base/vacancy/VacancyForm'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

const CreateVacancyPageContent = () => {
  return <VacancyForm />
}

export default function CreateVacancyPage() {
  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <CreateVacancyPageContent />
    </Page>
  )
}
