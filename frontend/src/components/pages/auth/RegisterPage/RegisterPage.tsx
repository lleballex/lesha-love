import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Routes } from '@/config/routes'
import { useMe } from '@/api/me/get-me'
import Page from '@/components/special/Page'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { userRoles } from '@/types/entities/user'
import { useRegister } from '@/api/auth/register'

import { formInitData, formResolver } from './utils'

export default function RegisterPage() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: formResolver,
    defaultValues: formInitData,
  })

  const { mutate: register } = useRegister()

  const onSubmit = form.handleSubmit((data) => {
    register(data, {
      onSuccess: () => {
        navigate(Routes.home)
      },
    })
  })

  const me = useMe()

  useEffect(() => {
    if (me.status === 'success') {
      navigate(Routes.home)
    }
  }, [me, navigate])

  return (
    <Page className="flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Регистрация</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form className="contents" onSubmit={onSubmit}>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Кто вы?</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(userRoles).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-4">
              <Button className="w-full">Зарегистрироваться</Button>
              <Link to={Routes.login}>
                <Button type="button" variant="link">
                  Вход
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Page>
  )
}
