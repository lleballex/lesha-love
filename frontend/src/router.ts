import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layouts/RootLayout'
import LoginPage from '@/components/pages/auth/LoginPage'
import RegisterPage from './components/pages/auth/RegisterPage'
import HomePage from '@/components/pages/HomePage/HomePage'
import CandidateVacanciesPage from '@/components/pages/candidate/CandidateVacanciesPage'
import CandidateVacancyPage from '@/components/pages/candidate/CandidateVacancyPage'
import CandidateResponsesPage from '@/components/pages/candidate/CandidateResponsesPage'
import RecruiterVacanciesPage from '@/components/pages/recruiter/RecruiterVacanciesPage'
import RecruiterResponsesPage from '@/components/pages/recruiter/RecruiterResponsesPage'
import RecruiterVacancyPage from '@/components/pages/recruiter/RecruiterVacancyPage'
import RecruiterCreateVacancyPage from '@/components/pages/recruiter/RecruiterCreateVacancyPage'
import RecruiterUpdateVacancyPage from './components/pages/recruiter/RecruiterUpdateVacancyPage'
import CandidateProfilePage from '@/components/pages/candidate/CandidateProfilePage'
import RecruiterProfilePage from '@/components/pages/recruiter/RecruiterProfilePage'
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
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
          {
            path: 'register',
            Component: RegisterPage,
          },
        ],
      },
      {
        path: 'candidate',
        children: [
          {
            path: 'profile',
            Component: CandidateProfilePage,
          },
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
      {
        path: 'recruiter',
        children: [
          {
            path: 'profile',
            Component: RecruiterProfilePage,
          },
          {
            path: 'new-vacancy',
            Component: RecruiterCreateVacancyPage,
          },
          {
            path: 'vacancies',
            Component: RecruiterVacanciesPage,
          },
          {
            path: 'vacancies/:id',
            Component: RecruiterVacancyPage,
          },
          {
            path: 'vacancies/:id/edit',
            Component: RecruiterUpdateVacancyPage,
          },
          {
            path: 'responses',
            Component: RecruiterResponsesPage,
          },
        ],
      },
    ],
  },
])
