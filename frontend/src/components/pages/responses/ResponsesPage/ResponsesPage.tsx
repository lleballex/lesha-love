import { useMyResponses } from '@/api/responses/get-my-responses'
import ResponseCard from '@/components/base/response/ResponseCard'
import Page from '@/components/special/Page'
import RemoteData from '@/components/special/RemoteData'
import { UserRole } from '@/types/entities/user'

const ResponsesPageContent = () => {
  const responses = useMyResponses()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold">Отклики</h1>
      <RemoteData
        data={responses}
        onSuccess={(responses) =>
          responses.length ? (
            <div className="flex flex-col gap-6">
              {responses.map((response) => (
                <ResponseCard key={response.id} response={response} />
              ))}
            </div>
          ) : (
            <p className="text-center">Ничего не найдено</p>
          )
        }
      />
    </div>
  )
}

export default function ResponsesPage() {
  return (
    <Page roles={[UserRole.Candidate]}>
      <ResponsesPageContent />
    </Page>
  )
}
