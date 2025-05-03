import { Response } from '@/types/entities/response'
import VacancyCard from '@/components/base/vacancy/VacancyCard'
import { UserRole } from '@/types/entities/user'

interface Props {
  response: Response
  role: UserRole
  link: string
}

export default function ResponseCard({ response, role, link }: Props) {
  if (!response.vacancy) {
    return null
  }

  return (
    <VacancyCard
      vacancy={response.vacancy}
      response={response}
      role={role}
      link={link}
    />
  )
}
