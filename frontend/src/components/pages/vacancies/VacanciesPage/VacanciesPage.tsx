import { Link } from 'react-router'

import { useVacancies } from '@/api/vacancies/get-vacancies'
import RemoteData from '@/components/special/RemoteData'
import VacancyCard from '@/components/base/vacancy/VacancyCard'
import { Routes } from '@/config/routes'
import Page from '@/components/special/Page'

const VacanciesPageContent = () => {
  const vacancies = useVacancies()

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Вакансии</h1>
        <Link to={Routes.newVacancy}>Добавить вакансию</Link>
      </div>
      <RemoteData
        data={vacancies}
        onSuccess={(vacancies) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}
      />
    </div>
  )
}

export default function VacancyPage() {
  return (
    <Page>
      <VacanciesPageContent />
    </Page>
  )
}
