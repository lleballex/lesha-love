import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

import Page from '@/components/special/Page'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { FormData, formResolver, getFormInitData } from './utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCandidate } from '@/api/me/create-candidate'
import { useUpdateCandidate } from '@/api/me/update-candidate'
import { useMe } from '@/api/me/get-me'
import { useEffect } from 'react'

export default function CandidateProfilePage() {
  const me = useMe()

  const form = useForm<FormData>({
    resolver: formResolver,
    defaultValues: getFormInitData(),
  })

  useEffect(() => {
    if (me.status === 'success') {
      form.reset(getFormInitData(me.value))
    }
  }, [me])

  const { mutate: createCandidate } = useCreateCandidate()
  const { mutate: updateCandidate } = useUpdateCandidate()

  const onSubmit = form.handleSubmit((data) => {
    if (me.status !== 'success') return

    if (me.value.candidate) {
      updateCandidate(data)
    } else {
      createCandidate(data)
    }
  })

  return (
    <Page>
      <Form {...form}>
        <form
          className="flex flex-col gap-8 max-w-[1000px]"
          onSubmit={onSubmit}
        >
          <Card>
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <p className="text-2xl font-bold">Основная информация</p>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Фамилия*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Имя*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patronymic"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Отчество</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="bornAt"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Дата рождения*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline">
                                {dayjs(field.value).format('DD.MM.YYYY')}
                                <CalendarIcon className="ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Город проживания</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-2xl font-bold">Контактная информация</p>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Номер телефона*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-2xl font-bold">
                  Профессиональная информация
                </p>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Ключевые навыки*</FormLabel>
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
                    <FormItem className="w-full">
                      <FormLabel>Описание*</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="jobName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Желаемая должность*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryFrom"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Желаемая з/п*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="self-start">Сохранить изменения</Button>
        </form>
      </Form>
    </Page>
  )
}
