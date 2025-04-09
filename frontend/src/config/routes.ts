export const Routes = {
  home: '/',

  login: '/auth/login',
  register: '/auth/register',

  vacancies: '/',
  newVacancy: '/new-vacancy',
  vacancy: (id: string) => `/vacancies/${id}`,
  updateVacancy: (id: string) => `/vacancies/${id}/edit`,
}
