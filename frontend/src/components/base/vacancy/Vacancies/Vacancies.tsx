import { useVacancies } from '@/api/utils/vacancies/get-vacancies'
import RemoteData from '@/components/special/RemoteData'
import VacancyCard from '@/components/base/vacancy/VacancyCard'

export default function Vacancies() {
  const vacancies = useVacancies()

  return (
    <div>
      <h1>Vacancies</h1>
      <RemoteData
        data={vacancies}
        onSuccess={(vacancies) => (
          <div>
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}
      />
    </div>
  )
}
