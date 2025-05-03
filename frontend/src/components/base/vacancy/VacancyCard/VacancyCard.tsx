import { Link } from 'react-router'
import dayjs from 'dayjs'

import {
  Vacancy,
  vacancyWorkExperiences,
  vacancyWorkFormats,
  vacancyWorkSchedules,
} from '@/types/entities/vacancy'
import { Routes } from '@/config/routes'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import VacancyStatus from '@/components/base/vacancy/VacancyStatus'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useMe } from '@/api/auth/me'
import { UserRole } from '@/types/entities/user'

interface Props {
  vacancy: Vacancy
}

export default function VacancyCard({ vacancy }: Props) {
  const me = useMe()

  return (
    <Link to={Routes.vacancy(vacancy.id)}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <p>От {dayjs(vacancy.createdAt).format('DD MMMM YYYY')}</p>
            {me.status === 'success' &&
              me.value.role === UserRole.Recruiter && (
                <VacancyStatus status={vacancy.status} />
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

          {me.status === 'success' && me.value.role === UserRole.Recruiter && (
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
