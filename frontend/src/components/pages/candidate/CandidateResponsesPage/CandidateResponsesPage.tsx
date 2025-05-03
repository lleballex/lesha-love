import Responses from '@/components/base/response/Responses'
import Page from '@/components/special/Page'
import { UserRole } from '@/types/entities/user'

export default function CandidateResponsesPage() {
  return (
    <Page roles={[UserRole.Candidate]} protected>
      <Responses role={UserRole.Candidate} />
    </Page>
  )
}
