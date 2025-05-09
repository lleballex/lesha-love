import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useMe } from '@/api/me/get-me'
import { UserRole } from '@/types/entities/user'
import { Routes } from '@/config/routes'

interface Props {
  children?: ReactNode
}

export default function UserProfileProvider({ children }: Props) {
  const { pathname } = useLocation()

  const me = useMe()

  if (
    me.status === 'success' &&
    !me.value.recruiter &&
    !me.value.candidate &&
    pathname !== Routes.recruiter.profile &&
    pathname !== Routes.candidate.profile
  ) {
    return (
      <Navigate
        to={
          {
            [UserRole.Recruiter]: Routes.recruiter.profile,
            [UserRole.Candidate]: Routes.candidate.profile,
          }[me.value.role]
        }
      />
    )
  }

  return children
}
