import dayjs from 'dayjs'

import { Card, CardContent } from '@/components/ui/card'
import { Response } from '@/types/entities/response'
import ResponseStatus from '@/components/base/response/ResponseStatus'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ResponseStatus as IResponseStatus } from '@/types/entities/response'
import { Button } from '@/components/ui/button'
import ApproveResponseModal from '@/components/base/response/ApproveResponseModal'
import RejectResponseModal from '@/components/base/response/RejectResponseModal'

interface Props {
  response: Response
}

export default function ResponseCardForRecruiter({ response }: Props) {
  if (!response.candidate) {
    return null
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <p>От {dayjs(response.createdAt).format('D MMMM YYYY')}</p>
          <ResponseStatus status={response.status} />
        </div>

        <div className="flex gap-4">
          <div className="flex gap-2 w-full">
            <Avatar>
              <AvatarFallback>
                {response.candidate.surname[0]} {response.candidate.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p className="text-white text-base font-semibold">
                {response.candidate.surname} {response.candidate.name}
              </p>
              <p>{response.candidate.jobName}</p>
              <p>
                {dayjs(response.candidate.bornAt).format('DD.MM.YYYY')},{' '}
                {response.candidate.city}
              </p>
              {response.candidate.salaryFrom !== null && (
                <p>З/п от {response.candidate.salaryFrom} ₽</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full text-sm text-muted-foreground">
            <p className="text-white text-base font-semibold">
              Ключевые навыки
            </p>
            <p>{response.candidate.skills}</p>
          </div>
          <div className="flex flex-col gap-2 w-full text-sm text-muted-foreground">
            <p className="text-white text-base font-semibold">Контакты</p>
            <p>{response.candidate.phone}</p>
            {response.candidate.user && <p>{response.candidate.user.email}</p>}
          </div>
        </div>

        <Separator />

        {response.status === IResponseStatus.Pending ? (
          <div className="flex gap-4">
            <ApproveResponseModal response={response}>
              <Button>Принять</Button>
            </ApproveResponseModal>
            <RejectResponseModal response={response}>
              <Button variant="destructive">Отказать</Button>
            </RejectResponseModal>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-muted-foreground font-semibold">
              {
                {
                  [IResponseStatus.Approved]: 'Принято',
                  [IResponseStatus.Rejected]: 'Отклонено',
                }[response.status]
              }{' '}
              с сообщением:
            </p>
            <p>{response.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
