import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useCreateVacancy } from '@/api/vacancies/create-vacancy'
import { Routes } from '@/config/routes'
import { Vacancy } from '@/types/entities/vacancy'
import { useUpdateVacancy } from '@/api/vacancies/update-vacancy'

import { FormData } from './utils'

interface Props {
  vacancy?: Vacancy
}

export default function VacancyForm({ vacancy }: Props) {
  const navigate = useNavigate()

  const form = useForm<FormData>({
    defaultValues: vacancy,
  })

  const { mutate: createVacancy } = useCreateVacancy()
  const { mutate: updateVacancy } = useUpdateVacancy()

  const submit = form.handleSubmit((data) => {
    if (vacancy) {
      updateVacancy(
        {
          ...data,
          id: vacancy.id,
        },
        {
          onSuccess: () => {
            navigate(Routes.vacancy(vacancy.id))
          },
        },
      )
    } else {
      createVacancy(data, {
        onSuccess: () => {
          navigate(Routes.vacancies)
        },
      })
    }
  })

  return (
    <form onSubmit={submit}>
      <h1>{vacancy ? 'Изменение вакансии' : 'Создание вакансии'}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <div>
          <label>Название: </label>
          <input {...form.register('title', { required: true })} />
        </div>
        <div>
          <label>Описание: </label>
          <input {...form.register('description', { required: true })} />
        </div>
        <div>
          <button type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  )
}
