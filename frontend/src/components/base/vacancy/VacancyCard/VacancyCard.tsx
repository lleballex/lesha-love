import { Link } from 'react-router'
import dayjs from 'dayjs'

import {
  Vacancy,
  vacancyWorkExperiences,
  vacancyWorkFormats,
  vacancyWorkSchedules,
} from '@/types/entities/vacancy'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import VacancyStatus from '@/components/base/vacancy/VacancyStatus'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { UserRole } from '@/types/entities/user'
import { Response } from '@/types/entities/response'
import ResponseStatus from '@/components/base/response/ResponseStatus'

interface Props {
  vacancy: Vacancy
  response?: Response
  link: string
  role: UserRole
}

export default function VacancyCard({ vacancy, response, link, role }: Props) {
  return (
    <Link to={link}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <p>От {dayjs(vacancy.createdAt).format('DD MMMM YYYY')}</p>
            {role === UserRole.Recruiter && (
              <VacancyStatus status={vacancy.status} />
            )}
            {role === UserRole.Candidate && response && (
              <ResponseStatus status={response.status} />
            )}
            {vacancy.scope && (
              <Badge className="ml-auto">{vacancy.scope.name}</Badge>
            )}
          </div>

          <CardTitle className="text-2xl font-semibold">
            {vacancy.title}
          </CardTitle>

          {vacancy.recruiter && <div>{vacancy.recruiter.companyName}</div>}

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <p>{vacancyWorkExperiences[vacancy.workExperience]}</p>
            <p>{vacancyWorkFormats[vacancy.workFormat]}</p>
            <p>{vacancyWorkSchedules[vacancy.workSchedule]}</p>
            {/* TODO: extract salary logic to somewhere */}
            {(vacancy.salaryFrom !== null || vacancy.salaryTo !== null) && (
              <p>
                З/п{' '}
                {vacancy.salaryFrom !== null && `от ${vacancy.salaryFrom} ₽`}{' '}
                {vacancy.salaryTo !== null && `до ${vacancy.salaryTo} ₽`}
              </p>
            )}
          </div>

          {role === UserRole.Recruiter && (
            <>
              <Separator />
              <p className="text-muted-foreground">
                Откликов: {vacancy.responsesCount}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
