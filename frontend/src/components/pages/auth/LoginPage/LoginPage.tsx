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
import { useLogin } from '@/api/auth/login'
import { useMe } from '@/api/me/get-me'

import { formInitData, formResolver } from './utils'
import Page from '@/components/special/Page'

const LoginPageContent = () => {
  const navigate = useNavigate()

  const form = useForm({
    resolver: formResolver,
    defaultValues: formInitData,
  })

  const { mutate: login } = useLogin()

  const onSubmit = form.handleSubmit((data) => {
    login(data, {
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
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Авторизация</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="contents" onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-6">
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
            <Button className="w-full">Войти</Button>
            <Link to={Routes.register}>
              <Button type="button" variant="link">
                Регистрация
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <Page className="flex items-center justify-center">
      <LoginPageContent />
    </Page>
  )
}
