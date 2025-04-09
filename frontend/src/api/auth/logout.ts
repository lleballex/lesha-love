import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { Routes } from '@/config/routes'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return () => {
    localStorage.removeItem('authToken')
    queryClient.resetQueries()
    navigate(Routes.home)
  }
}
