import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from 'react-router'

import RootLayoutHeader from './RootLayoutHeader'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutHeader />
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
