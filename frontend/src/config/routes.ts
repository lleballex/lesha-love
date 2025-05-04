export const Routes = {
  home: '/',

  login: '/auth/login',
  register: '/auth/register',

  candidate: {
    vacancies: '/candidate/vacancies',
    vacancy: (id: string) => `/candidate/vacancies/${id}`,

    responses: '/candidate/responses',
  },

  recruiter: {
    newVacancy: '/recruiter/new-vacancy',
    vacancies: '/recruiter/vacancies',
    vacancy: (id: string) => `/recruiter/vacancies/${id}`,
    updateVacancy: (id: string) => `/recruiter/vacancies/${id}/edit`,

    responses: '/recruiter/responses',
  },
}
