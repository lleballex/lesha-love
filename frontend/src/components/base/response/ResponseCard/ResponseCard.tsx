import { Response } from '@/types/entities/response'
import VacancyCard from '@/components/base/vacancy/VacancyCard'

interface Props {
  response: Response
}

export default function ResponseCard({ response }: Props) {
  if (!response.vacancy) {
    return null
  }

  return <VacancyCard vacancy={response.vacancy} response={response} />
}
