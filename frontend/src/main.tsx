import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import { router } from '@/router'
import '@/assets/css/index.css'

dayjs.locale('ru')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
