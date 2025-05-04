import Responses from '@/components/base/response/Responses'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function RecruiterResponsesPage() {
  return (
    <Page roles={[UserRole.Recruiter]} protected>
      <Responses role={UserRole.Recruiter} />
    </Page>
  )
}
