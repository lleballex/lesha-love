import dayjs from 'dayjs'
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  PenIcon,
  TrashIcon,
} from 'lucide-react'
import { Link } from 'react-router'

import { useVacancy } from '@/api/vacancies/get-vacancy'
import RemoteData from '@/components/special/RemoteData'
import {
  VacancyStatus,
  vacancyWorkExperiences,
  vacancyWorkFormats,
  vacancyWorkSchedules,
} from '@/types/entities/vacancy'
import { UserRole } from '@/types/entities/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCreateMyResponse } from '@/api/responses/create-my-response'
import { useMyResponse } from '@/api/responses/get-my-response'
import { responseStatuses } from '@/types/entities/response'
import { Routes } from '@/config/routes'
import DeleteVacancyModal from '@/components/base/vacancy/DeleteVacancyModal'

import VacancyResponses from './VacancyResponses'
import ChangeVacancyStatusModal from '../ChangeVacancyStatusModal'

interface Props {
  id: string
  role: UserRole
}

export default function Vacancy({ id, role }: Props) {
  const vacancy = useVacancy({ id })
  const myResponse = useMyResponse(
    { vacancyId: id },
    { enabled: role === UserRole.Candidate },
  )

  const { mutate: createMyResponse_ } = useCreateMyResponse()
  const createMyResponse = () => {
    createMyResponse_({
      vacancyId: id,
    })
  }

  return (
    <RemoteData
      data={vacancy}
      onSuccess={(vacancy) => (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-8">
            <h1 className="text-4xl font-extrabold">{vacancy.title}</h1>
            <div className="flex items-center gap-4">
              {role === UserRole.Candidate &&
                myResponse.status === 'error' &&
                myResponse.error.status === 404 && (
                  <Button onClick={createMyResponse}>Откликнуться</Button>
                )}
              {role === UserRole.Recruiter && (
                <Link to={Routes.recruiter.updateVacancy(vacancy.id)}>
                  <Button>
                    <PenIcon />
                    Изменить
                  </Button>
                </Link>
              )}
              {role === UserRole.Recruiter && (
                <ChangeVacancyStatusModal vacancy={vacancy}>
                  <Button variant="secondary">
                    {vacancy.status === VacancyStatus.Active && (
                      <>
                        <ArchiveIcon />В архив
                      </>
                    )}
                    {vacancy.status === VacancyStatus.Closed && (
                      <>
                        <ArchiveRestoreIcon />
                        Активировать
                      </>
                    )}
                  </Button>
                </ChangeVacancyStatusModal>
              )}
              {role === UserRole.Recruiter && (
                <DeleteVacancyModal vacancy={vacancy}>
                  <Button variant="destructive">
                    <TrashIcon />
                    Удалить
                  </Button>
                </DeleteVacancyModal>
              )}
            </div>
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

          <div className="flex items-start gap-8">
            <div className="flex flex-col gap-8 flex-grow">
              <div className="flex gap-8">
                <Card className="w-full">
                  <CardContent className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">Опыт</p>
                    <p>{vacancyWorkExperiences[vacancy.workExperience]}</p>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardContent className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      Формат работы
                    </p>
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
                    {vacancy.salaryFrom !== null ||
                    vacancy.salaryTo !== null ? (
                      <p>
                        {vacancy.salaryFrom !== null &&
                          `от ${vacancy.salaryFrom} ₽`}{' '}
                        {vacancy.salaryTo !== null &&
                          `до ${vacancy.salaryTo} ₽`}
                      </p>
                    ) : (
                      <p>Не указано</p>
                    )}
                  </CardContent>
                </Card>
                {vacancy.scope && (
                  <Card className="w-full">
                    <CardContent className="flex flex-col gap-3">
                      <p className="text-sm text-muted-foreground">
                        Направление
                      </p>
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

              {role === UserRole.Recruiter && (
                <VacancyResponses vacancy={vacancy} />
              )}
            </div>

            <div className="w-[300px] shrink-0">
              {myResponse.status === 'success' && (
                <Card>
                  <CardContent className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      Статус отклика
                    </p>
                    {/* TODO: use ResponseStatus component */}
                    <p>{responseStatuses[myResponse.value.status]}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    />
  )
}
