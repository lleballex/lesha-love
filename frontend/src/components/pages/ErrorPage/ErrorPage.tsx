import { useMemo } from 'react'
import { Link, useRouteError } from 'react-router'

import { Button } from '@/components/ui/button'
import { Routes } from '@/config/routes'

export default function ErrorPage() {
  const error = useRouteError()

  const message: any = useMemo(() => {
    if (error instanceof Object) {
      if ('message' in error) {
        return error.message
      } else if (
        'error' in error &&
        error.error instanceof Object &&
        'message' in error.error
      ) {
        return error.error.message
      }
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center min-h-[100dvh]">
      <h1 className="text-4xl font-extrabold">Ой-ой, что-то пошло не так (</h1>
      {message && <p className="text-muted-foreground">{message}</p>}
      <Link to={Routes.home}>
        <Button>На главную</Button>
      </Link>
    </div>
  )
}
