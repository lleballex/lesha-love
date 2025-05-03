import { Link, NavLink } from 'react-router'
import { HeartIcon } from 'lucide-react'

import { useLogout } from '@/api/auth/logout'
import { useMe } from '@/api/me/get-me'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { UserRole } from '@/types/entities/user'

export default function RootLayoutHeader() {
  const me = useMe()

  const logout = useLogout()

  const profile = useMemo(() => {
    if (me.status !== 'success') {
      return null
    }

    return {
      [UserRole.Recruiter]: me.value.recruiter,
      [UserRole.Candidate]: me.value.candidate,
    }[me.value.role]
  }, [me])

  return (
    <header className="px-8 py-6 border-b flex items-center justify-between gap-6">
      <Link className="flex items-center gap-2" to={Routes.home}>
        <HeartIcon className="fill-primary stroke-primary" />
        <h1 className="text-xl font-extrabold">Lesha Love</h1>
      </Link>
      <div className="flex items-center gap-8">
        <NavLink to={Routes.vacancies}>
          {({ isActive }) => (
            <span
              className={cn('text-sm hover:underline underline-offset-4', {
                underline: isActive,
              })}
            >
              Вакансии
            </span>
          )}
        </NavLink>
        <NavLink to={Routes.responses}>
          {({ isActive }) => (
            <span
              className={cn('text-sm hover:underline underline-offset-4', {
                underline: isActive,
              })}
            >
              Отклики
            </span>
          )}
        </NavLink>

        {me.status !== 'success' && (
          <Link to={Routes.login}>
            <Button>Войти</Button>
          </Link>
        )}

        {profile && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {profile.surname[0]} {profile.name[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {profile.surname} {profile.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
