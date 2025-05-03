import { ReactNode } from 'react'
import { Navigate } from 'react-router'

import { UserRole } from '@/types/entities/user'
import { useMe } from '@/api/me/get-me'
import RemoteData from '@/components/special/RemoteData'
import { Routes } from '@/config/routes'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  roles?: UserRole[]
  protected?: boolean
  children?: ReactNode
}

export default function Page({
  className,
  roles,
  protected: isProtected,
  children,
}: Props) {
  const me = useMe({
    enabled: isProtected,
  })

  if (isProtected) {
    if (me.status === 'success' && roles && !roles.includes(me.value.role)) {
      return <Navigate to={Routes.home} replace />
    }

    if (me.status === 'error') {
      return <Navigate to={Routes.login} replace />
    }
  }

  return (
    <div className={cn('p-8 grow', className)}>
      {isProtected ? (
        <RemoteData data={me} onSuccess={() => children} />
      ) : (
        children
      )}
    </div>
  )
}
