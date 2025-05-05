import { ReactNode, useState } from 'react'

import { Vacancy, VacancyStatus } from '@/types/entities/vacancy'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useUpdateVacancy } from '@/api/vacancies/update-vacancy'

interface Props {
  vacancy: Vacancy
  children?: ReactNode
}

export default function ChangeVacancyStatusModal({ vacancy, children }: Props) {
  const [isActive, setIsActive] = useState(false)

  const { mutate: updateVacancy } = useUpdateVacancy()

  const onSubmit = () => {
    updateVacancy(
      {
        id: vacancy.id,
        status: {
          [VacancyStatus.Active]: VacancyStatus.Closed,
          [VacancyStatus.Closed]: VacancyStatus.Active,
        }[vacancy.status],
      },
      {
        onSuccess: () => {
          setIsActive(false)
        },
      },
    )
  }

  return (
    <AlertDialog open={isActive} onOpenChange={setIsActive}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {
              {
                [VacancyStatus.Active]: 'Архивировать вакансию?',
                [VacancyStatus.Closed]: 'Активировать вакансию?',
              }[vacancy.status]
            }
          </AlertDialogTitle>
          <AlertDialogDescription>
            {
              {
                [VacancyStatus.Active]:
                  'Вакансия в архиве не будет видна соискателям. Ее можно будет вернуть из архива в любой момент',
                [VacancyStatus.Closed]:
                  'Вакансия снова станет видна соискателям',
              }[vacancy.status]
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Нет</AlertDialogCancel>
          <Button onClick={onSubmit}>Да</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
