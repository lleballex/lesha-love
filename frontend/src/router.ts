import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layouts/RootLayout'
import LoginPage from '@/components/pages/auth/LoginPage'
import HomePage from '@/components/pages/HomePage/HomePage'
import CandidateVacanciesPage from '@/components/pages/candidate/CandidateVacanciesPage'
import CandidateVacancyPage from '@/components/pages/candidate/CandidateVacancyPage'
import CandidateResponsesPage from '@/components/pages/candidate/CandidateResponsesPage/CandidateResponsesPage'

export const router = createBrowserRouter([
  {
    path: '',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
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
      {
        path: 'candidate',
        children: [
          {
            path: 'vacancies',
            Component: CandidateVacanciesPage,
          },
          {
            path: 'vacancies/:id',
            Component: CandidateVacancyPage,
          },
          {
            path: 'responses',
            Component: CandidateResponsesPage,
          },
        ],
      },
    ],
  },
])
