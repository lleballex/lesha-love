import { Link, useNavigate, useParams } from 'react-router'

import { useVacancy } from '@/api/vacancies/get-vacancy'
import RemoteData from '@/components/special/RemoteData'
import { useDeleteVacancy } from '@/api/vacancies/delete-vacancy'
import { Routes } from '@/config/routes'
import { vacancyStatuses } from '@/types/entities/vacancy'
import Page from '@/components/special/Page'

const VacancyPageConent = () => {
  const { id: vacancyId } = useParams()
  const navigate = useNavigate()

  const vacancy = useVacancy({ id: vacancyId! })

  const { mutate: deleteVacancy_ } = useDeleteVacancy()

  const deleteVacancy = () => {
    if (vacancy.status !== 'success') {
      return
    }

    deleteVacancy_(
      { id: vacancy.value.id },
      {
        onSuccess: () => {
          navigate(Routes.vacancies)
        },
      },
    )
  }

  return (
    <RemoteData
      data={vacancy}
      onSuccess={(vacancy) => (
        <div>
          <h1>{vacancy.title}</h1>
          <p>Создана: {vacancy.createdAt}</p>
          <p>Статус: {vacancyStatuses[vacancy.status]}</p>
          <p>{vacancy.description}</p>
          <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
            <Link to={Routes.vacancies}>К списку вакансий</Link>
            <Link to={Routes.updateVacancy(vacancy.id)}>Изменить</Link>
            <button onClick={deleteVacancy}>Удалить</button>
          </div>
        </div>
      )}
    />
  )
}

export default function VacancyPage() {
  return (
    <Page>
      <VacancyPageConent />
    </Page>
  )
}
