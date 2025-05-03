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
    vacancies: '/recruiter/vacancies',
    vacancy: (id: string) => `/recruiter/vacancies/${id}`,

    responses: '/recruiter/responses',
  },

  // newVacancy: '/new-vacancy',
  // vacancy: (id: string) => `/vacancies/${id}`,
  // updateVacancy: (id: string) => `/vacancies/${id}/edit`,
}
