import { Vacancy } from '@/types/entities/vacancy'

interface Props {
  vacancy: Vacancy
}

export default function VacancyCard({ vacancy }: Props) {
  return (
    <fieldset>
      <legend>{vacancy.title}</legend>
      <p>{vacancy.description}</p>
    </fieldset>
  )
}
