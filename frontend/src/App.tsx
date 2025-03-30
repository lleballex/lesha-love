import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Vacancies from '@/components/base/vacancy/Vacancies'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vacancies />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
