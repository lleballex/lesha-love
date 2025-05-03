import { useParams } from 'react-router'
import dayjs from 'dayjs'

import { useVacancy } from '@/api/vacancies/get-vacancy'
import RemoteData from '@/components/special/RemoteData'
import {
  vacancyWorkExperiences,
  vacancyWorkFormats,
  vacancyWorkSchedules,
} from '@/types/entities/vacancy'
import Page from '@/components/special/Page'
import { useMe } from '@/api/auth/me'
import { UserRole } from '@/types/entities/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const VacancyPageConent = () => {
  const { id: vacancyId } = useParams()

  const me = useMe()
  const vacancy = useVacancy({ id: vacancyId! })

  return (
    <RemoteData
      data={vacancy}
      onSuccess={(vacancy) => (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8">
            <h1 className="text-4xl font-extrabold">{vacancy.title}</h1>
            {me.status === 'success' &&
              me.value.role === UserRole.Candidate && (
                <Button>Откликнуться</Button>
              )}
          </div>

          {vacancy.recruiter && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {vacancy.recruiter.companyName[0]}
                </AvatarFallback>
                <AvatarImage src={vacancy.recruiter.companyLogo} />
              </Avatar>
              <p>{vacancy.recruiter.companyName}</p>
            </div>
          )}

          <div className="flex gap-8">
            <Card className="w-full">
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">Опыт</p>
                <p>{vacancyWorkExperiences[vacancy.workExperience]}</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">Формат работы</p>
                <p>{vacancyWorkFormats[vacancy.workFormat]}</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">График</p>
                <p>{vacancyWorkSchedules[vacancy.workSchedule]}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-8">
            <Card className="w-full">
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">З/п</p>
                {vacancy.salaryFrom !== null || vacancy.salaryTo !== null ? (
                  <p>
                    {vacancy.salaryFrom !== null &&
                      `от ${vacancy.salaryFrom} ₽`}{' '}
                    {vacancy.salaryTo !== null && `до ${vacancy.salaryTo} ₽`}
                  </p>
                ) : (
                  <p>Не указано</p>
                )}
              </CardContent>
            </Card>
            {vacancy.scope && (
              <Card className="w-full">
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">Направление</p>
                  <p>{vacancy.scope.name}</p>
                </CardContent>
              </Card>
            )}
            <Card className="w-full">
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Дата создания вакансии
                </p>
                <p>{dayjs(vacancy.createdAt).format('D MMMM YYYY')}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="flex gap-6 flex-wrap">
              <div className="flex flex-col gap-2 w-full">
                <p className="font-bold">Описание</p>
                <p>{vacancy.description}</p>
              </div>
              {vacancy.responsibilities && (
                <div className="flex flex-col gap-2 w-[calc(50%-var(--spacing)*6/2)]">
                  <p className="font-bold">Задачи</p>
                  <p>{vacancy.responsibilities}</p>
                </div>
              )}
              {vacancy.requirements && (
                <div className="flex flex-col gap-2 w-[calc(50%-var(--spacing)*6/2)]">
                  <p className="font-bold">Ожидания от соискателя</p>
                  <p>{vacancy.requirements}</p>
                </div>
              )}
              {vacancy.conditions && (
                <div className="flex flex-col gap-2 w-[calc(50%-var(--spacing)*6/2)]">
                  <p className="font-bold">Условия</p>
                  <p>{vacancy.conditions}</p>
                </div>
              )}
            </CardContent>
          </Card>
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
