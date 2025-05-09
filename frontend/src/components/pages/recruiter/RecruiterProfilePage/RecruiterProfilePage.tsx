import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

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
import { useMe } from '@/api/me/get-me'
import { useCreateRecruiter } from '@/api/me/create-recruiter'
import { useUpdateRecruiter } from '@/api/me/update-recruiter'

export default function RecruiterProfilePage() {
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

  const { mutate: createRecruiter } = useCreateRecruiter()
  const { mutate: updateRecruiter } = useUpdateRecruiter()

  const onSubmit = form.handleSubmit((data) => {
    if (me.status !== 'success') return

    if (me.value.recruiter) {
      updateRecruiter(data)
    } else {
      createRecruiter(data)
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
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Название компании*</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyLogo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Логотип компании*</FormLabel>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-[calc(50%-var(--spacing)*3)]">
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
            </CardContent>
          </Card>

          <Button className="self-start">Сохранить изменения</Button>
        </form>
      </Form>
    </Page>
  )
}
