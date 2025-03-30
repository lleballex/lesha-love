import { Link } from 'react-router'

import { Vacancy } from '@/types/entities/vacancy'
import { Routes } from '@/config/routes'

interface Props {
  vacancy: Vacancy
}

export default function VacancyCard({ vacancy }: Props) {
  return (
    <fieldset>
      <legend>{vacancy.title}</legend>
      <p>{vacancy.description}</p>
      <Link to={Routes.vacancy(vacancy.id)}>Подробнее</Link>
    </fieldset>
  )
}
