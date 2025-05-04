import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useCreateVacancy } from '@/api/vacancies/create-vacancy'
import { Routes } from '@/config/routes'
import {
  Vacancy,
  vacancyWorkExperiences,
  vacancyWorkFormats,
  vacancyWorkSchedules,
} from '@/types/entities/vacancy'
import { useUpdateVacancy } from '@/api/vacancies/update-vacancy'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useScopes } from '@/api/scopes/get-scopes'

import { formResolver, getFormInitData } from './utils'

interface Props {
  vacancy?: Vacancy
}

export default function VacancyForm({ vacancy }: Props) {
  const navigate = useNavigate()

  const form = useForm({
    resolver: formResolver,
    defaultValues: getFormInitData(vacancy),
  })

  const { mutate: createVacancy } = useCreateVacancy()
  const { mutate: updateVacancy } = useUpdateVacancy()

  const onSubmit = form.handleSubmit((data) => {
    if (vacancy) {
      updateVacancy(
        {
          ...data,
          id: vacancy.id,
        },
        {
          onSuccess: () => {
            navigate(Routes.recruiter.vacancy(vacancy.id))
          },
        },
      )
    } else {
      createVacancy(data, {
        onSuccess: () => {
          navigate(Routes.recruiter.vacancies)
        },
      })
    }
  })

  const scopes = useScopes()

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8 max-w-[800px]" onSubmit={onSubmit}>
        <h1 className="text-4xl font-extrabold">
          {vacancy ? 'Изменение вакансии' : 'Создание вакансии'}
        </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание*</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Задачи</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ожидания от соискателя</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Условия</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="workExperience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Опыт работы*</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vacancyWorkExperiences).map(
                        ([key, val]) => (
                          <SelectItem key={key} value={key}>
                            {val}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workSchedule"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>График работы*</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vacancyWorkSchedules).map(
                        ([key, val]) => (
                          <SelectItem key={key} value={key}>
                            {val}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workFormat"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Формат работы*</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vacancyWorkFormats).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="salaryFrom"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Минимальная з/п</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryTo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Максимальная з/п</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormItem className="w-[calc(50%-var(--spacing)*4/2)]">
              <FormLabel>Направление*</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scopes.status === 'success' &&
                      scopes.value.map((scope) => (
                        <SelectItem key={scope.id} value={scope.id}>
                          {scope.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-start px-10">
          {vacancy ? 'Сохранить' : 'Создать'}
        </Button>
      </form>
    </Form>
  )
}
