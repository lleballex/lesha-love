import { useMyResponses } from '@/api/responses/get-my-responses'
import ResponseCard from '@/components/base/response/ResponseCard'
import RemoteData from '@/components/special/RemoteData'
import { Routes } from '@/config/routes'
import { UserRole } from '@/types/entities/user'

interface Props {
  role: UserRole
}

export default function Responses({ role }: Props) {
  const responses = useMyResponses()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold">Отклики</h1>
      <RemoteData
        data={responses}
        onSuccess={(responses) =>
          responses.length ? (
            <div className="flex flex-col gap-6">
              {responses.map(
                (response) =>
                  response.vacancy && (
                    <ResponseCard
                      key={response.id}
                      response={response}
                      role={role}
                      link={Routes.candidate.vacancy(response.vacancy.id)} // TODO: link for recruiter
                    />
                  ),
              )}
            </div>
          ) : (
            <p className="text-center">Ничего не найдено</p>
          )
        }
      />
    </div>
  )
}
