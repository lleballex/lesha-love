import { useNavigate } from 'react-router'
import { ReactNode, useState } from 'react'

import { Vacancy } from '@/types/entities/vacancy'
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
import { useDeleteVacancy } from '@/api/vacancies/delete-vacancy'
import { Button } from '@/components/ui/button'
import { Routes } from '@/config/routes'

interface Props {
  vacancy: Vacancy
  children?: ReactNode
}

export default function DeleteVacancyModal({ vacancy, children }: Props) {
  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(false)

  const { mutate: deleteVacancy } = useDeleteVacancy()

  const onSubmit = () => {
    deleteVacancy(
      { id: vacancy.id },
      {
        onSuccess: () => {
          setIsActive(false)
          navigate(Routes.recruiter.vacancies)
        },
      },
    )
  }

  return (
    <AlertDialog open={isActive} onOpenChange={setIsActive}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Точно удалить вакансию?</AlertDialogTitle>
          <AlertDialogDescription>
            После удаления восстановить вакансию будет невозможно
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
