import { Link } from 'react-router'

import { useLogout } from '@/api/auth/logout'
import { useMe } from '@/api/auth/me'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Routes } from '@/config/routes'

export default function RootLayoutHeader() {
  const me = useMe()

  const logout = useLogout()

  return (
    <header className="px-8 py-6 border-b flex items-center justify-between gap-6">
      <Link to={Routes.home}>
        <h1 className="text-xl font-bold">Lesha Love</h1>
      </Link>
      <div>
        {me.status !== 'success' && (
          <Link to={Routes.login}>
            <Button>Войти</Button>
          </Link>
        )}

        {me.status === 'success' && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {me.value.surname[0]} {me.value.name[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {me.value.surname} {me.value.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
