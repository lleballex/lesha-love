import { useResponses } from '@/api/responses/get-responses'
import ResponseCard from '@/components/base/response/ResponseCard'
import RemoteData from '@/components/special/RemoteData'
import { UserRole } from '@/types/entities/user'
import { Vacancy } from '@/types/entities/vacancy'

interface Props {
  vacancy: Vacancy
}

export default function VacancyResponses({ vacancy }: Props) {
  const responses = useResponses({
    byCurRecruiter: true,
    vacancy: vacancy.id,
  })

  return (
    <>
      <h2 className="text-2xl font-extrabold">Отклики</h2>
      <RemoteData
        data={responses}
        onSuccess={(responses) =>
          responses.length ? (
            <div className="flex flex-col gap-4">
              {responses.map((response) => (
                <ResponseCard
                  key={response.id}
                  response={response}
                  role={UserRole.Recruiter}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">Ничего не найдено</p>
          )
        }
      />
    </>
  )
}
