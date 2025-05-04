import { Response } from '@/types/entities/response'
import VacancyCard from '@/components/base/vacancy/VacancyCard'
import { UserRole } from '@/types/entities/user'

import ResponseCardForRecruiter from './ResponseCardForRecruiter'

interface CandidateProps {
  response: Response
  role: UserRole.Candidate
  link: string
}

interface RecruiterProps {
  response: Response
  role: UserRole.Recruiter
}

export default function ResponseCard({
  response,
  ...props
}: CandidateProps | RecruiterProps) {
  if (!response.vacancy) {
    return null
  }

  if (props.role === UserRole.Candidate) {
    return (
      <VacancyCard
        vacancy={response.vacancy}
        response={response}
        role={props.role}
        link={props.link}
      />
    )
  } else {
    return <ResponseCardForRecruiter response={response} />
  }
}
