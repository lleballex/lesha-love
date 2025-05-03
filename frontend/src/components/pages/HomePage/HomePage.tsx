import { useMe } from '@/api/me/get-me'
import { Routes } from '@/config/routes'
import { UserRole } from '@/types/entities/user'
import { Navigate } from 'react-router'

export default function HomePage() {
  const me = useMe()

  if (me.status === 'success') {
    return (
      <Navigate
        to={
          {
            [UserRole.Recruiter]: Routes.recruiter.vacancies,
            [UserRole.Candidate]: Routes.candidate.vacancies,
          }[me.value.role]
        }
      />
    )
  } else if (me.status === 'error') {
    return <Navigate to={Routes.login} />
  } else {
    return 'Wait a little'
  }
}
