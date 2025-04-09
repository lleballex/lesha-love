import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layouts/RootLayout'
import VacanciesPage from '@/components/pages/vacancies/VacanciesPage'
import VacancyPage from '@/components/pages/vacancies/VacancyPage'
import CreateVacancyPage from '@/components/pages/vacancies/CreateVacancyPage'
import UpdateVacancyPage from '@/components/pages/vacancies/UpdateVacancyPage'
import LoginPage from '@/components/pages/auth/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: VacanciesPage },
      {
        path: 'new-vacancy',
        Component: CreateVacancyPage,
      },
      {
        path: 'vacancies/:id',
        Component: VacancyPage,
      },
      {
        path: 'vacancies/:id/edit',
        Component: UpdateVacancyPage,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            Component: LoginPage,
          },
        ],
      },
    ],
  },
])
